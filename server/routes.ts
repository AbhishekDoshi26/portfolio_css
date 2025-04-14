import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { SOCIAL_LINKS, PERSONAL_DETAILS } from "../client/src/lib/constants";
import nodemailer from 'nodemailer';

export async function registerRoutes(app: Express): Promise<Server> {
  // Social profile redirects
  app.get("/linkedin", (_, res) => res.redirect(SOCIAL_LINKS.linkedin));
  app.get("/github", (_, res) => res.redirect(SOCIAL_LINKS.github));
  app.get("/twitter", (_, res) => res.redirect(SOCIAL_LINKS.twitter));
  app.get("/instagram", (_, res) => res.redirect(SOCIAL_LINKS.instagram));
  app.get("/medium", (_, res) => res.redirect(SOCIAL_LINKS.medium));
  app.get("/calendly", (_, res) => res.redirect(SOCIAL_LINKS.calendly));
  app.get("/cv", (_, res) => res.redirect(PERSONAL_DETAILS.cv_url));
  // Contact form endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const contactData = insertContactSchema.parse(req.body);
      
      // Create nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'adoshi26.ad@gmail.com',
          pass: process.env.EMAIL_PASSWORD // You'll need to set this up in Secrets
        }
      });

      // Setup email data
      const mailOptions = {
        from: contactData.email,
        to: 'adoshi26.ad@gmail.com',
        subject: `Portfolio Contact: ${contactData.subject}`,
        text: `Name: ${contactData.name}\nEmail: ${contactData.email}\nMessage: ${contactData.message}`
      };

      // Send email
      await transporter.sendMail(mailOptions);
      
      // Return success response
      return res.status(200).json({
        message: "Contact message sent successfully"
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Format validation errors
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation error",
          errors: validationError.details
        });
      }
      
      console.error("Error saving contact message:", error);
      return res.status(500).json({
        message: "Failed to send message. Please try again later."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
