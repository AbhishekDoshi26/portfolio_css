// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true
});

// server/routes.ts
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// client/src/lib/constants.ts
var SOCIAL_LINKS = {
  github: "https://github.com/AbhishekDoshi26",
  linkedin: "https://www.linkedin.com/in/abhishekdoshi26/",
  twitter: "https://twitter.com/AbhishekDoshi26",
  instagram: "https://www.instagram.com/abhishekdoshi26/",
  medium: "https://abhishekdoshi26.medium.com/",
  email: "mailto:adoshi26.ad@gmail.com",
  calendly: "https://calendly.com/abhishekdoshi26",
  phone: "tel:+917818044311"
};
var PERSONAL_DETAILS = {
  name: "Abhishek",
  position: "Google Developer Expert",
  intro: "Hi! I'm Abhishek",
  description: "Google Developer Expert for Dart, Flutter & Firebase. Working with Flutter and Firebase for over 6 years. With deep expertise in mobile development, I can bring your app ideas to life. Community Leader & Content Creator passionate about teaching and sharing knowledge.",
  about: "Flutter Developer and Google Developer Expert (GDE) for Dart, Flutter & Firebase working in app development for 6+ years, specialized in creating beautiful, high-performance mobile and web applications with Flutter. With extensive experience, I transform your vision into reality and give your app a soul that resonates with users. Let's collaborate and bring your ideas to life with cutting-edge technology.",
  linkedinShort: "linkedin.com/in/abhishekdoshi26",
  email: "adoshi26.ad@gmail.com",
  phone: "+917818044311",
  cv_url: "https://drive.google.com/file/d/1ZcpXka01BQz6Rd1cyQtV9SqcegH5hh3l/view?usp=sharing"
};

// server/routes.ts
import nodemailer from "nodemailer";
async function registerRoutes(app2) {
  app2.get("/linkedin", (_, res) => res.redirect(SOCIAL_LINKS.linkedin));
  app2.get("/github", (_, res) => res.redirect(SOCIAL_LINKS.github));
  app2.get("/twitter", (_, res) => res.redirect(SOCIAL_LINKS.twitter));
  app2.get("/instagram", (_, res) => res.redirect(SOCIAL_LINKS.instagram));
  app2.get("/medium", (_, res) => res.redirect(SOCIAL_LINKS.medium));
  app2.get("/calendly", (_, res) => res.redirect(SOCIAL_LINKS.calendly));
  app2.get("/cv", (_, res) => res.redirect(PERSONAL_DETAILS.cv_url));
  app2.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "adoshi26.ad@gmail.com",
          pass: process.env.EMAIL_PASSWORD
          // You'll need to set this up in Secrets
        }
      });
      const mailOptions = {
        from: contactData.email,
        to: "adoshi26.ad@gmail.com",
        subject: `Portfolio Contact: ${contactData.subject}`,
        text: `Name: ${contactData.name}
Email: ${contactData.email}
Message: ${contactData.message}`
      };
      await transporter.sendMail(mailOptions);
      return res.status(200).json({
        message: "Contact message sent successfully"
      });
    } catch (error) {
      if (error instanceof ZodError) {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
