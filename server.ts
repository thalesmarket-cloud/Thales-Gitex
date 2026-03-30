import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for registration
  app.post("/api/register", async (req, res) => {
    const { fullName, companyName, jobTitle, email, phone, preferredDay, preferredTime, message } = req.body;

    try {
      const sheetId = process.env.GOOGLE_SHEET_ID;
      const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

      if (!sheetId || !clientEmail || !privateKey) {
        console.warn("Google Sheets configuration missing. Check environment variables.");
        return res.status(500).json({ 
          error: "Configuration Google Sheets manquante. Veuillez configurer les variables d'environnement." 
        });
      }

      const serviceAccountAuth = new JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
      await doc.loadInfo();
      
      const sheet = doc.sheetsByIndex[0]; // Use the first sheet
      
      await sheet.addRow({
        "Date Inscription": new Date().toLocaleString("fr-FR"),
        "Nom Complet": fullName,
        "Entreprise": companyName,
        "Poste": jobTitle,
        "Email": email,
        "Téléphone": phone,
        "Jour": preferredDay,
        "Heure": preferredTime,
        "Message": message || ""
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Error adding row to Google Sheets:", error);
      res.status(500).json({ error: "Erreur lors de l'enregistrement dans Google Sheets." });
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
