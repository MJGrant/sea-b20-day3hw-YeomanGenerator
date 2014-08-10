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
      message: 'Node app name (no spaces)',
      default: 'none'
    }, {
      name: 'description:',
      message: 'Site or app description',
      default: 'none'
    }, {
      name: 'version',
      message: 'Version',
      default: '0.0.1'
    }, {
      name: 'repository',
      message: 'Project git repository'
    }, {
      name: 'homepage',
      message: 'Project homepage'
    }, {
      name: 'license',
      message: 'License',
      default: 'MIT'
    }, {
      name: 'authorName',
      message: 'Author name',
      default: 'John Smith',
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
      this.appName = props.appName;
      this.description = props.description;
      this.shortName = props.name;

      if (!props.homepage) {
        props.homepage = this.repoUrl;
      }

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

    var context = {
      site_name: this.siteTitle,
      author_name: this.authorName,
      author_email: this.authorEmail,
      site_description: this.siteDescription,
    };

    this.template("_index.html", "index.html", context);
    this.template("_package.json", "package.json", context);
  },

  createPkg: function() {
    var pkgFile = {
      name: this.appName,
      version: this.props.version,
      description: this.props.description,
      homepage: this.props.homepage,
      repository: this.props.repository,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      keywords: [],
      main: 'index.js',
      engines: {
        node: this.props.nodeVersion
      },
      license: this.props.license,
      devDependencies: {},
      scripts: {}
    };
  this.writeFileFromString(JSON.stringify(pkgFile, null, 2), 'package.json');
  },
});