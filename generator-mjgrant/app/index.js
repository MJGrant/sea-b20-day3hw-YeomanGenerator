var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  promptUser: function() {
    var done = this.async();
    console.log(this.yeoman);

    var prompts = [
      {
      name: 'siteTitle',
      message: 'Site or app <title>'
    },{
      name: 'appName',
      message: 'Node app name [no spaces]',
      default: 'none'
    }, {
      name: 'description',
      message: 'Site or app description',
      default: 'none'
    }, {
      name: 'version',
      message: 'Version',
      default: '0.1.0'
    }, {
      name: 'main',
      message: 'Main file',
      default: 'server.js'
    }, {
      name: 'github',
      message: 'github repository url',
    }, {
      name: 'license',
      message: 'License',
      default: 'MIT'
    }, {
      name: 'authorName',
      message: 'Author name',
      default: '',
    }, {
      name: 'authorEmail',
      message: 'Author email'
    }, {
      name: 'authorUrl',
      message: 'Author url'
    }, {
      name: 'nodeVersion',
      message: 'What versions of node does it run on?',
      default: '>= 0.8.0'
    },
  ];
  
    this.prompt(prompts, function(props) {
      this.siteTitle = props.siteTitle;
      this.authorName = props.authorName;
      this.authorEmail = props.authorEmail;
      this.authorUrl = props.authorUrl;
      this.github = props.github;
      this.appName = props.appName;
      this.description = props.description;

      this.props = props;

      done();
    }.bind(this));
  },

  scaffoldFolders: function() {
    this.mkdir("js");
    this.mkdir("stylesheets");
  },

  copyMainFiles: function() {
    this.copy("_scripts.js","js/scripts.js");
    this.copy("_style.css", "stylesheets/style.css");
    this.copy("_gitignore", ".gitignore");
    this.copy("_server.js","server.js");
    this.copy("_README.md", "README.md");
    //vars used in populating the index.html file
    var context = {
      site_name: this.siteTitle,
      author_name: this.authorName,
      author_email: this.authorEmail,
      site_description: this.siteDescription,
    };

    this.template("_index.html", "index.html", context);
  },

  createPkg: function() {
    var pkgFile = {
      name: this.appName,
      version: this.props.version,
      description: this.props.description,
      homepage: this.props.homepage,
      repository: {
        type: "git",
        url: this.props.github
      },
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      keywords: [],
      main: 'server.js',
      engines: {
        node: this.props.nodeVersion
      },
      license: this.props.license,
      devDependencies: {
        "express": "^4.7.4",
      },
      scripts: {}
    };

  this.writeFileFromString(JSON.stringify(pkgFile, null, 2), 'package.json');
  console.log("\ncreated package.json\n");
  },
  
});