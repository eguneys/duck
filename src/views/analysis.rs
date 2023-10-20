use html::root::Html;

use super::{base::layout, environment::Templates};

pub struct AnalysisView {
  templ: Templates
}

impl AnalysisView {

  pub fn new(templ: Templates) -> Self {
    AnalysisView { templ }
  }

  pub fn show(&self) -> Html {
    layout(|main| {
      main
    },self.templ.hfrag(vec![
      self.templ.css_tag("analysis".to_string())
    ]), 
    self.templ.js_module_init("analysis".to_string(), "hello".to_string()))
  }
}