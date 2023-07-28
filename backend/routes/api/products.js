const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/productsController");
const verifyUserRole = require("../../middlewares/verifyRole");
const verifyJWT = require("../../middlewares/verifyJWT");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(verifyJWT, verifyUserRole("admin"), productsController.addNewProduct);

router
  .route("/:id")
  .get(productsController.getProduct)
  .put(verifyJWT, verifyUserRole("admin"), productsController.updateProduct)
  .delete(verifyJWT, verifyUserRole("admin"), productsController.deleteProduct);

module.exports = router;
