const connectEnsureLogin = require('connect-ensure-login'); //authorization
const {Issue} = require('../models/issue');
const {Location} = require('../models/location');
const {Reporting} = require('../models/reporting');
const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth,  async(req, res) => {

    //user

    thisUser = req.user;

    // Critical Issue
    const issues = await Issue.find().sort('-numberOfReports');
    topIssue = issues[0];

    //Critical Issue Percentage
    let total = 0;
    issues.map((issue) => {
        total += issue.numberOfReports;
    });

    const topIssuePercentage = (topIssue.numberOfReports / total) * 100;


    // total reports
    const reportings = await Reporting.find().sort('-dateReported');

    let totalReports = 0;
    reportings.map((report) => {
        totalReports ++;
    });


        // Critical location
        const locations = await Location.find().sort('-numberOfIssues');
        topLocation = locations[0];


        //total loaction
        const totalLocationPercentage = (topLocation.numberOfIssues / total) * 100;


    res.render('index', {
        topIssue,
        topLocation,
        thisUser,
        reportings,
        issues,
        locations,
        'topIssuePercentage' : topIssuePercentage,
        'totalReports' : totalReports,
        'totalLocationPercentage' : totalLocationPercentage
    })
});

module.exports = router;