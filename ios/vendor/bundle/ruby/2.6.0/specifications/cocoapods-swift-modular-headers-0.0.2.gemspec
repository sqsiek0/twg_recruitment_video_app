# -*- encoding: utf-8 -*-
# stub: cocoapods-swift-modular-headers 0.0.2 ruby lib

Gem::Specification.new do |s|
  s.name = "cocoapods-swift-modular-headers".freeze
  s.version = "0.0.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Oskar Kwas\u0301niewski".freeze]
  s.date = "2024-12-08"
  s.description = "Automatically enables modular headers for dependencies of Swift pods. Useful for React Native projects.".freeze
  s.email = ["oskarkwasniewski@icloud.com".freeze]
  s.homepage = "https://github.com/okwasniewski/cocoapods-swift-modular-headers".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.0.3.1".freeze
  s.summary = "Automatically enables modular headers for dependencies of Swift pods.".freeze

  s.installed_by_version = "3.0.3.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<bundler>.freeze, [">= 2.3"])
    else
      s.add_dependency(%q<bundler>.freeze, [">= 2.3"])
    end
  else
    s.add_dependency(%q<bundler>.freeze, [">= 2.3"])
  end
end
