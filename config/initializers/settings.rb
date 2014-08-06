raw_config = File.read(RAILS_ROOT + "/config/settings.yml")
CONFIG_EMAIL = YAML.load(raw_config)[RAILS_ENV].symbolize_keys