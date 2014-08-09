require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

BASE_CONFIG = YAML.load(File.read(File.expand_path('../application.yml', __FILE__)))
BASE_CONFIG.merge! BASE_CONFIG.fetch(Rails.env, {})
BASE_CONFIG.symbolize_keys!

CONFIG = BASE_CONFIG[Rails.env.to_sym]

module Conservar
  class Application < Rails::Application
  
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    # config.autoload_paths += %W(#{config.root}/lib)

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    config.i18n.default_locale = CONFIG["locale"]

    config.assets.paths << Rails.root.join('vendor', 'assets')
    config.assets.paths << Rails.root.join('assets', 'fonts')

    config.generators do  |g|
      g.stylesheets     false
      g.javascripts     false
    end
  end
end
