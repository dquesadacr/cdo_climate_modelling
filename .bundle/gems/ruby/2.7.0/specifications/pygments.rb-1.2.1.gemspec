# -*- encoding: utf-8 -*-
# stub: pygments.rb 1.2.1 ruby lib

Gem::Specification.new do |s|
  s.name = "pygments.rb".freeze
  s.version = "1.2.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Aman Gupta".freeze, "Ted Nyman".freeze]
  s.date = "2017-12-07"
  s.description = "pygments.rb exposes the pygments syntax highlighter to Ruby".freeze
  s.email = ["aman@tmm1.net".freeze]
  s.homepage = "https://github.com/tmm1/pygments.rb".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.1.4".freeze
  s.summary = "pygments wrapper for ruby".freeze

  s.installed_by_version = "3.1.4" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<multi_json>.freeze, [">= 1.0.0"])
    s.add_development_dependency(%q<rake-compiler>.freeze, ["~> 0.7.6"])
    s.add_development_dependency(%q<test-unit>.freeze, ["~> 3.0.0"])
  else
    s.add_dependency(%q<multi_json>.freeze, [">= 1.0.0"])
    s.add_dependency(%q<rake-compiler>.freeze, ["~> 0.7.6"])
    s.add_dependency(%q<test-unit>.freeze, ["~> 3.0.0"])
  end
end
