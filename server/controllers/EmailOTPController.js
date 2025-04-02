const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { initialSchema } = require("../helpers/JoiValidation.js");
const User = require("../models/User.js");

const generate = () => {
  return randomstring.generate({ length: 6, charset: "numeric" });
};

const userAuth = process.env.NODEMAILER_AUTH_USER;
const passAuth = process.env.NODEMAILER_AUTH_PASS;

const send = (email, OTP) => {
  try {
    const mailOptions = {
      from: userAuth, // Sender Email
      to: email,
      subject: "Email Verification OTP",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification OTP</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
              }
              .container {
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  max-width: 400px;
                  width: 100%;
                  text-align: center;
              }
              .header {
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 20px;
                  color: #333333;
              }
              .otp {
                  font-size: 36px;
                  font-weight: bold;
                  color: #4CAF50;
                  letter-spacing: 4px;
                  margin-bottom: 20px;
              }
              .message {
                  font-size: 16px;
                  color: #666666;
                  margin-bottom: 20px;
              }
              .footer {
                  font-size: 12px;
                  color: #999999;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  ChitChat OTP Verification
              </div>
              <div class="otp">
                    ${OTP}
              </div>
              <div class="message">
                  Please use the above OTP to complete your registration process. This OTP is valid for 10 minutes.
              </div>
              <div class="footer">
                  If you did not request this OTP, please ignore this email.
              </div>
          </div>
      </body>
      </html>
    `,
    };

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: userAuth, // Sender Auth Email
        pass: passAuth, // Sender Auth Password
      },
      tls: {
        rejectUnauthorized: false, // Disable certificate validation
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error occurred: ", error);
      } else {
        console.log(`OTP sent to ${email} successfully.`);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const OTPCache = [];

const sendOTP = async (req, res) => {
  try {
    const result = await initialSchema.validateAsync(req.body);

    const { email } = result;

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists" });
    }

    const OTP = generate();

    const timestamp = Date.now(); // Current timestamp
    OTPCache[email] = { OTP: OTP, timestamp: timestamp }; // Store OTP and timestamp in cache

    send(email, OTP);
    return res
      .status(200)
      .json({ message: `OTP sent to ${email} successfully` });
  } catch (error) {
    if (error.isJoi === true) {
      console.log(error);
      return res.status(422).json({ error: "Bad Request : Validation Failed" });
    } else {
      console.log(error);
      return res.status(500).json({ error: "Failed to generate and send OTP" });
    }
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, OTP } = req.body;

    if (OTP.length !== 6) {
      throw new Error("OTP must be exactly 6 characters long");
    }

    // Check if email exists in the cache
    if (!OTPCache[email]) {
      return res.status(400).json({ message: `OTP not found for ${email}` });
    }

    const requiredObj = OTPCache[email];
    const currentTime = Date.now();
    const expiryTime = 10 * 60 * 1000; // 10 minutes in milliseconds

    // Check if OTP has expired
    if (currentTime - requiredObj.timestamp > expiryTime) {
      delete OTPCache[email];
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Check if OTP matches the one stored in the cache
    if (requiredObj.OTP === OTP) {
      // Remove OTP from cache after successful verification
      delete OTPCache[email];
      console.log(`OTP verified for ${email}`);
      return res.status(200).json({ message: `OTP verified for ${email}` });
    } else {
      console.log("Invalid OTP");
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (err) {
    if (err.message === "OTP must be exactly 6 characters long") {
      return res
        .status(400)
        .json({ error: "OTP must be exactly 6 characters long" });
    }
    console.log("Unable to verify OTP", err);
    return res.status(500).json({ error: "Failed to verify OTP" });
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
};
