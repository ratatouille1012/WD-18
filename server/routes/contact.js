import { Router } from "express";

import { createContact, getContact } from "../controllers/contact.js";

const ContactRouter = Router();

ContactRouter.get("/", getContact);


ContactRouter.post("/", createContact);


export default ContactRouter;
