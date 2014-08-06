class Settings
  SETTINGS_FILE_PATH = File.join(Rails.root, 'config', 'settings.yml').freeze

  @settings = {}

  def self.load!
    @settings = yml_settings
    @settings.freeze
  end

  def self.[](key)
    @settings[key]
  end

  def self.yml_settings
    YAML.load_file(SETTINGS_FILE_PATH).deep_symbolize_keys![Rails.env.to_sym] || {}
  rescue Errno::ENOENT
    puts "Could not load settings from settings.yml file for #{Rails.env} environment"
    {}
  end

end

