use html::{metadata::builders::HeadBuilder, root::builders::BodyBuilder};

use super::environment::Templates;

 
 impl Templates {

  pub fn asset_base_url(&self) -> String {
    "".to_string()
  }


  pub fn minified_assets(&self) -> bool {
    return false
  }


  pub fn asset_url(&self, path: String) -> String {
    format!("{}/assets/{path}", self.asset_base_url())
  }


  pub fn css_tag(&self, name: String) -> impl FnOnce(&mut HeadBuilder) -> & mut HeadBuilder + '_  {
    self.css_at(format!("compiled/{name}{}.css", if self.minified_assets() { ".min" } else { "" }))
  }


  pub fn css_at(&self, path: String) -> impl FnOnce(&mut HeadBuilder) 
  -> & mut HeadBuilder + '_ {
    |head| {
      head.link(|link| 
        link.rel("stylesheet").href(self.asset_url(path)))
    }
  }
  
  pub fn hfrag<F>(&self, hs: Vec<F>) -> impl FnOnce(&mut HeadBuilder) -> & mut HeadBuilder 
    where for<'a> F: FnOnce(&'a mut HeadBuilder) -> &'a mut HeadBuilder {
      move |head| { 
        hs.into_iter().fold(head, |acc, f_n| f_n(acc)) }
    }

   pub fn bfrag<F>(&self, hs: Vec<F>) -> impl FnOnce(&mut BodyBuilder) -> & mut BodyBuilder 
    where for<'a> F: FnOnce(&'a mut BodyBuilder) -> &'a mut BodyBuilder {
      move |head| { 
        hs.into_iter().fold(head, |acc, f_n| f_n(acc)) }
    }
  
  
  
  pub fn js_module(&self, name: String, value: String) -> 
  impl FnOnce(&mut BodyBuilder) -> & mut BodyBuilder + '_ {
    move |body| {
  
      body.script(|script| {
        script.type_("module").src(self.asset_url(format!("compiled/{}{}.js", name, if self.minified_assets() { ".min" } else { "" })))
      })
    }
  }
  
  pub fn js_module_init(&self, module: String, value: String) -> 
  impl FnOnce(&mut BodyBuilder) -> & mut BodyBuilder + '_ {
    self.bfrag(vec![
      self.js_module(module, value) ])
  }
}
