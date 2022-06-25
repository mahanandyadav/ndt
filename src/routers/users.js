const express = require("express");
const { findById } = require("../mongoose/models/courses");
const Course = require("../mongoose/models/courses");

//setting up the student router
const usersRouter = new express.Router();

//write your code here

usersRouter.post("/api/courses/enroll/:id", async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  try {
    const data = await Course.findById({ _id });

    if (data.isApplied === false) {
      data["isApplied"] = true;
     await data.save();
      res.status(200).send({
        "message": "You have successfully enrolled for the course",
      });
    } else {
      res.status(403).send({
        "error": "You have already applied for this course",
      });
    }
  } catch (e) {
    res.status(400).send({ "message": "course not found" + e });
  }
});

usersRouter.delete('/api/courses/drop/:id', async (req, res, next) => {
  const _id = req.params.id
  try {
    const data = await Course.findById({ _id })
    if (data.isApplied === true) {
      data['isApplied'] = false
      await data.save()
      res.status(200).send({
        message: 'You have dropped the course',
      })
      next()
    } else {
      res.status(403).send({
        error: 'You have not enrolled for this course',
      })
      next()
    }
  } catch (e) {
    res.status(400).send({ message: 'error deleting' + e })
  }
})

const cors = require('cors')
usersRouter.get('/api/courses/get',cors(), async (req, res) => {
  try {
    const data = await Course.find({})
    res.status(200).send(data)
  } catch (e) {
    res.status(400).send({ message: 'error @ get' + e })
  }
})



usersRouter.patch('/api/courses/rating/:id', async (req, res) => {
  const _id = req.params.id
  console.log(req)
  console.log('rating/:id@')
  try {
    // if (!req.body.rating) { throw error  }
    if (req.body.rating === undefined) {
      throw error
    }
    let data = await Course.findById({ _id })
    if (data.isRated === true) {
      res.status(403).send({ error: 'You have already rated this course' })
      return
    }
    if (data.isApplied === false) {
      res.status(403).send({ error: 'You have not enrolled for this course' })
      return
    }
    ;(data['rating'] = req.body.rating),
      (data['noOfRatings'] = data.noOfRatings + 1),
      (data['isRated'] = true)

    data.save()
    res.status(200).send({ message: 'You have rated this course' })
    return
  } catch (e) {
    res.status(400).send({ error: 'error@' + e })
    return
  }
})
module.exports = usersRouter;
