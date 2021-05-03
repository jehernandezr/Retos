const Offer = require("../models/OfferModel");

exports.deleteOffer= async (req, res, next) => {
    const doc = await Offer.findByIdAndDelete(req.params.id);

    if (!doc) return res.status(404)

    res.status(200).json({
      status: "success",
      message: "Document with document id:" + req.params.id + " Succesfully deleted.",
    });
  };

exports.updateOffer = async (req, res, next) => {
    const doc = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return res.status(404)

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  };

exports.createOffer = async (req, res, next) => {
    const doc = await Offer.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  };

exports.getOffer = async (req, res, next) => {
    let query = Offer.findById(req.params.id);
    const doc = await query;

    if (!doc) return res.status(404)
    else {
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  };
}

exports.getAllOffers = async (req, res, next) => {

    const docs = await Offer.find();
    if (!docs) return res.status(404)
    res.status(200).json({
      status: "success",
      data: docs
    });
  };