import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { SOCIAL_LINKS } from "../client/src/lib/constants";

export async function registerRoutes(app: Express): Promise<Server> {
  // Social profile redirects
  app.get("/linkedin", (_, res) => res.redirect(SOCIAL_LINKS.linkedin));
  app.get("/github", (_, res) => res.redirect(SOCIAL_LINKS.github));
  app.get("/twitter", (_, res) => res.redirect(SOCIAL_LINKS.twitter));
  app.get("/instagram", (_, res) => res.redirect(SOCIAL_LINKS.instagram));
  app.get("/medium", (_, res) => res.redirect(SOCIAL_LINKS.medium));
  app.get("/calendly", (_, res) => res.redirect(SOCIAL_LINKS.calendly));
  // Contact form endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const contactData = insertContactSchema.parse(req.body);
      
      // Save the contact message
      const message = await storage.createContactMessage(contactData);
      
      // Return success response
      return res.status(200).json({
        message: "Contact message sent successfully",
        id: message.id
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
