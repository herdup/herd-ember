module.exports = {
  description: 'Installs the Ember Uploader bower package into the host application.',
  
  normalizeEntityName: function() {
  },

  afterInstall: function() {
    return this.addBowerPackageToProject('ember-uploader', '0.3.8');
  }
};
