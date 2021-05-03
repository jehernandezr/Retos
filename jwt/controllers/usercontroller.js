const User = require("../models/UserModel");

exports.deleteUser= async (req, res, next) => {
    const doc = await User.findByIdAndDelete(req.params.id);

    if (!doc) return res.status(404)

    res.status(200).json({
      status: "success",
      message: "Document with document id:" + req.params.id + " Succesfully deleted.",
    });
  };

exports.updateUser = async (req, res, next) => {
    const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
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

exports.createUser = async (req, res, next) => {
    const doc = await User.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  };

exports.getUser = async (req, res, next) => {
    let query = User.findById(req.params.id);
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

exports.getAllUsers = async (req, res, next) => {

    const docs = await User.findAll();
    if (!docs) return res.status(404)
    res.status(200).json({
      status: "success",
      data: docs
    });
  };