use html::{root::{Html, builders::BodyBuilder}, content::builders::MainBuilder, metadata::builders::HeadBuilder};

use super::environment::Templates;

pub struct Base {
  templ: Templates
}

pub trait HasBase {

  fn templ(&self) -> Templates;

  fn base(&self) -> Base {
    Base::new(self.templ())
  }

 fn layout<F, Css, Js>(&self, main_builder: F, 
    more_css: Css, 
    more_js: Js) -> Html 
    where for<'a> Css: FnOnce(&'a mut HeadBuilder) -> &'a mut HeadBuilder, 
    for<'a> Js: FnOnce(&'a mut BodyBuilder) -> &'a mut BodyBuilder, 
    for<'a> F: FnOnce(&'a mut MainBuilder) -> &'a mut MainBuilder {
      self.base().layout(main_builder, more_css, more_js)
    }
  
}

impl Base {

  pub fn new(templ: Templates) -> Self {
    Base { templ }
  }

  pub fn layout<F, Css, Js>(&self, main_builder: F, 
    more_css: Css, 
    more_js: Js) -> Html 
    where for<'a> Css: FnOnce(&'a mut HeadBuilder) -> &'a mut HeadBuilder, 
    for<'a> Js: FnOnce(&'a mut BodyBuilder) -> &'a mut BodyBuilder, 
    for<'a> F: FnOnce(&'a mut MainBuilder) -> &'a mut MainBuilder {
  
    Html::builder()
    .head(|head| {
      let mut res = head
      .title(|title| {
        title.text("duckchess.org Free Online Duck Chess")
      })
      .link(|link| link.rel("stylesheet").href("assets/compiled/site.css"));
  
       res = more_css(res);
  
      res
    })
    .body(|body| {

      let body = body.data("dev", if self.templ.minified_assets() { "false" } else { "true" });

      let mut res = body.navigation(|nav| {
        nav.division(|div|
          div.class("logo")
          .anchor(|a| 
            a.href("https://duckchess.org").text("duckchess.org"))
        )
        .division(|div| {
          div.class("links")
          .unordered_list(|ul| {
  
            ul.list_item(|li| 
                li.anchor(|a| a.href("/").text("Play Online")))
              .list_item(|li| li.text("Watch"))
              .list_item(|li| li.text("Tournaments"))
              .list_item(|li| li.text("Play Puzzles"))
              .list_item(|li| li.text("Donate"))
              .list_item(|li| 
                li.anchor(|a| a.href("/analysis").text("Engine Analysis")))
          })
        })
        .division(|div| {
          div.class("dasher")
          .text("lichess.org/@/heroku")
        })
  
      })
      .main(main_builder);
    
  
      res = self.templ.embed_js_unsafe(r#"duckchess24={load:new Promise(r =>document.addEventListener('DOMContentLoaded', r))}"#.to_string())
      (res);
      res = self.templ.js_module("duckchess24".to_string())
      (res);
  
      res = more_js(res);
  
      res
    })
    .build()
  }
}