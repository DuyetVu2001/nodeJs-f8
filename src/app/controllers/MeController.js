const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../ulti/mongoose');

class MeController {
	//  [GET] /me/stored/courses
	storedCourses(req, res, next) {
		Promise.all([Course.find({}).sortable(req), Course.countDeleted()])
			.then(([courses, countDeleted]) => {
				res.render('me/stored-courses', {
					courses: multipleMongooseToObject(courses),
					countDeleted,
				});
			})
			.catch(next);
	}

	//  [GET] /me/trash/courses
	trashCourses(req, res, next) {
		Course.findDeleted({})
			.then((courses) => {
				res.render('me/trash-courses', {
					courses: multipleMongooseToObject(courses),
				});
			})
			.catch(next);
	}
}

module.exports = new MeController();
