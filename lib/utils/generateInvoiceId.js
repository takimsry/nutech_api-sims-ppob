import { nanoid } from "nanoid";

export const generateInvoiceId = () => {
  const now = new Date();
  const datePart = now.toLocaleDateString('id-ID').replace(/\//g, '');
  const nanoidPart = nanoid(10);

  return `INV${datePart}-${nanoidPart}`;
}