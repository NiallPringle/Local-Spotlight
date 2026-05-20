import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, business, message } = req.body;

    if (!name || !email || !business || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_PASS;

    if (!gmailUser || !gmailPass) {
      console.warn("DEBUG: GMAIL_USER or GMAIL_PASS environment variables are not set. Form submission logged but not emailed.");
      console.log("Form Data:", { name, email, business, message });
      
      // In development, we return 200 to allow testing the UI
      if (process.env.NODE_ENV !== "production") {
        return res.status(200).json({ 
          success: true, 
          message: "Form submission simulated successfully (Set GMAIL_USER/PASS for real emails)" 
        });
      }
      
      return res.status(500).json({ error: "Email configuration missing on server." });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });

      const mailOptions = {
        from: `"${name}" <${gmailUser}>`,
        to: "info@localspotlight.ie",
        subject: `New Inquiry: ${business}`,
        text: `Name: ${name}\nEmail: ${email}\nBusiness: ${business}\n\nMessage:\n${message}`,
        replyTo: email,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
