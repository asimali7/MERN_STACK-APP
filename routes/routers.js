const express = require("express");
const router = express.Router();
const tasks = require("../model/taskschema");

router.post("/", async (req, res) => {
  const task = await new tasks({
    text: req.body.text,
    value: req.body.value,
    editingmode: req.body.editingmode,
  });
  task.save().then((data) => {
    res.json(data);
  });
});
router.get("/", async (req, res) => {
  const task = await tasks.find();
  res.json(task);
});
router.get("/:id", async (req, res) => {
  const task = await tasks.findById({ _id: req.params.id });
  res.json(task);
});

router.patch("/counter/:id", async (req, res) => {
  const task = await tasks.updateOne(
    { _id: req.params.id },
    {
      $set: {
        value: req.body.value,
      },
    }
  );

  res.json(task);
});
router.patch("/edit/:id", async (req, res) => {
  const task = await tasks.updateOne(
    { _id: req.params.id },
    {
      $set: {
        editingmode: req.body.editingmode,
      },
    }
  );

  res.json(task);
});
router.patch("/reset/:id", async (req, res) => {
  const task = await tasks.updateOne(
    { _id: req.params.id },
    {
      $set: {
        value: req.body.value,
      },
    }
  );

  res.json(task);
});
router.patch("/save/:id", async (req, res) => {
  const task = await tasks.updateOne(
    { _id: req.params.id },
    {
      $set: {
        text: req.body.text,
        editingmode: req.body.editingmode,
      },
    }
  );

  res.json(task);
});

router.patch("/reset", async (req, res) => {
  const task = await tasks.updateMany({
    $set: {
      value: req.body.value,
    },
  });

  res.json(task);
});

router.delete("/:id", async (req, res) => {
  const task = await tasks.deleteOne({ _id: req.params.id });
  res.json(task);
});
module.exports = router;
