// const Incidente = require('../models/incidentModel')
// const router = require('express').Router();


// router.post("", (req, res) => {
//   console.log(req.body);
//   const incidentForAdd = new Incidente({
//     location: req.body.location,
//     date: req.body.date,
//     time: req.body.time,
//     type: req.body.type,
//     description: req.body.description,
//     deadly: req.body.deadly,
//   });
//   incidentForAdd.save().then((createdIncident) => {
//     res.status(201).json({
//       idIncidentAdded: createdIncident._id,
//     });
//   });
// });

// module.exports = router;

// exports.create = ((req, res) => {

//   const incident = new Incident();
//   incident.location = req.body.location;
//   incident.date = req.body.date;
//   incident.time = req.body.time;
//   incident.type = req.body.type;
//   incident.description = req.body.description;
//   incident.deadly = req.body.deadly;

//   incident.save().then((createdIncident) => {
//     res.status(201).json({
//       message: 'New incident add',
//       data: createdIncident._id,
//     }).catch((err) => {
//       res.json({
//         message: 'error creating incident' + err
//       })
//     })
//   })
// });

// exports.list = ((_req, res) => {

//   Incidente.find().then((incident) => {
//     res.status(200).json({
//       status: "success",
//       message: "Incidents listed correctly",
//       data: incident
//     }).catch((err) => {
//       res.json({
//         statusText: "error listing incidents",
//         message: err
//       })
//     })
//   })
// });


// exports.search = ((req, res) => {
//   Incident.findById(req.params.id).then((incident) => {
//     res.status(200).json({
//       message: 'incident loading..',
//       data: incident
//     }).catch((err) => {
//       res.status(404).json({
//         message: err
//       })
//     })
//   })
// });

// exports.update = ((req, res) => {
//   Incident.findById(req.params.id).then((incident) => {

//     incident.location = req.body.location;
//     incident.date = req.body.date;
//     incident.time = req.body.time;
//     incident.type = req.body.type;
//     incident.description = req.body.description;
//     incident.deadly = req.body.deadly;

//     incident.save().then((incident) => {
//       res.status(201).json({
//         message: 'incident updated',
//         data: incident
//       }).catch((err) => {
//         res.json({
//           statusText: 'error updating incident',
//           message: err
//         })
//       })
//     })
//   })
// })

// exports.delete = ((req, res) => {
//   Incident.remove({
//     _id: req.params.id
//   }).then((_result) => {
//     res.status(200).json({
//       message: "Incident eliminado"
//     }).catch((err) => {
//       res.status(404).json({
//         message: err
//       })
//     })
//   })
// })
