const Sales = require("../models/sales.models");
const Courses = require('../../Courses/models/course.models');
const { findById } = require("../models/sales.models");

exports.createSales = async (req, res) => {

    const course = await Courses.findById(req.params.courseId)

    let saleDetails = {
        priceInCents: course.priceInCents,
        buyerId: req.user._id,
        sellerId: course.authorId,
        Date: new Date(),
        productId: course._id,
        productName: course.name
    }

    const sale = await Sales.create(saleDetails);

    res.status(201).json({
        status: "success",
        data : {
            sale
        }
    });
};

exports.getSales = async (req, res) => {

    const sales = await Sales.find({ sellerId: req.user._id }); 

    res.status(201).json({
        status: "success",
        data : {
            sales
        }
    });
};

exports.renderSalesPage = async (req, res) => {

    const sales = await Sales.find({ sellerId: req.user._id})

    let courseSales = {
        totalSalesNumber: sales.length,
        totalSalesInUsd: 0,
        courseNumber: 0,
        soldCourses:{
        }
    }

    sales.forEach(sale => {
        courseSales.totalSalesInUsd+= sale.priceInCents;

        if (courseSales.soldCourses[sale.productId]) {
            courseSales.soldCourses[sale.productId].salesNumber++;
            courseSales.soldCourses[sale.productId].salesInUsd+= sale.priceInCents
        }
        else {
            courseSales.soldCourses[sale.productId]={}
            courseSales.soldCourses[sale.productId].salesNumber=1;
            courseSales.soldCourses[sale.productId].salesInUsd= sale.priceInCents;
            courseSales.soldCourses[sale.productId].name = sale.productName
            courseSales.courseNumber++
        }
         
    });
    
    res.render('sales/show', {courseSales})

}
