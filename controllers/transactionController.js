import { getService } from "../models/servicesModel.js";
import { createTransaction, getAllTransactions } from "../models/transactionsModel.js";
import { getUserBalance, updateUserBalance } from "../models/userBalanceModel.js";
import { nanoid } from "nanoid";

export const getBalance = async (req, res) => {
  const userEmail = req.user.email;

  try {
    const balance = await getUserBalance(userEmail);

    res.status(200).json({
      status: 0,
      message: "Get Balance Berhasil",
      data: balance
    });
  } catch (error) {
    console.log("Error in getBanners controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const topUp = async (req, res) => {
  function generateInvoiceId() {
    const now = new Date();
    const datePart = now.toLocaleDateString('id-ID').replace(/\//g, '');
    const nanoidPart = nanoid(10);
  
    return `INV${datePart}-${nanoidPart}`;
  }

  const invoice_number = generateInvoiceId();
  const transaction_type = "TOPUP";
  const userEmail = req.user.email;
  const description = "Top Up balance";
  const { top_up_amount: total_amount } = req.body;

  if (typeof total_amount !== "number" || total_amount < 0) {
    return res.status(400).json({
      status: 102,
      message: "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
      data: null
    })
  }
  
  try {
    const balance = await getUserBalance(userEmail);
    const transaction = await createTransaction(invoice_number, transaction_type, description, total_amount, userEmail);

    if (transaction) {
      const updatedBalance = balance.balance + total_amount;
      const updatedOn = new Date().toLocaleString('en-GB');
      await updateUserBalance(userEmail, updatedBalance, updatedOn);

      res.status(200).json({
        status: 0,
        message: "Top Up Balance Berhasil",
        data: {
          balance: updatedBalance
        }
      });
    } else {
      res.status(400).json({ error: "Invalid transaction data" });
    }
  } catch (error) {
    console.log("Error in makeTransaction controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const makeTransaction = async (req, res) => {
  function generateInvoiceId() {
    const now = new Date();
    const datePart = now.toLocaleDateString('en-GB').replace(/\//g, '');
    const nanoidPart = nanoid(10);
  
    return `INV${datePart}-${nanoidPart}`;
  }

  const invoice_number = generateInvoiceId();
  const transaction_type = "PAYMENT";
  const userEmail = req.user.email;
  
  const { service_code } = req.body;
  const service = await getService(service_code);
  if (!service) {
    return res.status(400).json({
      status: 102,
      message: "Service atau Layanan tidak ditemukan",
      data: null
    });
  }
  
  const description = service.service_name;
  const total_amount = service.service_tariff;
  const balance = await getUserBalance(userEmail);
  if(total_amount > balance.balance) {
    return res.status(400).json({
      status: 102,
      message: "Saldo tidak mencukupi",
      data: null
    });
  }
  
  try {
    const transaction = await createTransaction(invoice_number, transaction_type, description, total_amount, userEmail);

    if (transaction) {
      const updatedBalance = balance.balance - total_amount;
      const updatedOn = new Date().toLocaleString('en-GB');
      await updateUserBalance(userEmail, updatedBalance, updatedOn);

      res.status(200).json({
        status: 0,
        message: "Transaksi Berhasil",
        data: {
          invoice_number,
          service_code,
          service_name: service.service_name,
          transaction_type,
          total_amount,
          created_on: transaction.created_on
        }
      });
    } else {
      res.status(400).json({ error: "Invalid transaction data" });
    }
  } catch (error) {
    console.log("Error in makeTransaction controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getTransactions = async (req, res) => {
  const userEmail = req.user.email;

  try {
    const transactions = await getAllTransactions(userEmail);

    res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      data: {
        records: transactions
      }
    });
  } catch (error) {
    console.log("Error in getTransactions controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
}