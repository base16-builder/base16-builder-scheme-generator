const generators = require('yeoman-generator'),
	gitConfig = require('git-config'),
	titleCase = require('title-case');

module.exports = generators.Base.extend({
	initializing: function () {
		this.props = {};
		this.defaults = {
			title: titleCase(this.appname)
		};
		gitConfig((err, config) => {
			if (!err && config.user) {
				this.defaults.author = config.user.name || null;
			}
		});
	},
	prompting: {
		title: function () {
			const done = this.async();
			this.prompt({
				name: 'title',
				message: 'The title of your scheme',
				default: this.defaults.title
			}, answer => {
				this.props.title = answer.title;
				done();
			});
		},
		author: function () {
			const done = this.async();
			this.prompt({
				name: 'author',
				message: 'The name of the original author',
				default: this.defaults.author
				// store: true // we can use it for file creator
			}, answer => {
				this.props.author = answer.author;
				done();
			});
		},
		// projectUrl: function () {
		// 	const done = this.async();
		// 	this.prompt({
		// 		name: 'projectUrl',
		// 		message: 'An url to the original project',
		// 		default: '',
		// 	}, answer => {
		// 		this.props.projectUrl = answer.projectUrl;
		// 		done();
		// 	});
		// },
	},
	writing: function () {
		this.fs.copyTpl(
			this.templatePath('scheme.yml'),
			this.destinationPath('scheme.yml'), {
				title: this.props.title,
				author: this.props.author
				// , projectUrl: this.props.projectUrl
			});
	}
});
