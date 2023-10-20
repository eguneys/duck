use html::root::Html;
use serde::Serialize;
use serde_json::to_value;

use super::{environment::Templates, base::HasBase};

pub struct AnalysisView {
  templ: Templates
}

impl HasBase for AnalysisView {
    fn templ(&self) -> Templates {
        self.templ.clone()
    }
}

#[derive(Serialize)]
pub struct AnalysisJsonData {
  data: String
}

impl AnalysisView {

  pub fn new(templ: Templates) -> Self {
    AnalysisView { templ }
  }

  pub fn show(&self) -> Html {

    let json: serde_json::Value = to_value(AnalysisJsonData { data: "hello".to_string() }).unwrap();

    self.layout(|main| {
      main
    },self.templ.hfrag(vec![
      self.templ.css_tag("analysis".to_string())
    ]), 
    self.templ.js_module_init("analysis".to_string(), json))
  }
}