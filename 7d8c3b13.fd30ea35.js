(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{71:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return s})),a.d(t,"metadata",(function(){return i})),a.d(t,"rightToc",(function(){return l})),a.d(t,"default",(function(){return b}));var n=a(1),r=a(6),o=(a(0),a(87)),s={id:"best_practices",title:"Platform Internationalization Best Practices",sidebar_label:"Best Practices"},i={unversionedId:"best_practices",id:"best_practices",isDocsHomePage:!1,title:"Platform Internationalization Best Practices",description:"Here are some rough guidelines and lessons learned by the internationalization team at Facebook. These are in no specific order of importance.",source:"@site/..\\docs\\best_practices.md",slug:"/best_practices",permalink:"/laravel-fbt/docs/best_practices",version:"current",lastUpdatedBy:"Richard Dobro\u0148",lastUpdatedAt:1693241492,sidebar_label:"Best Practices",sidebar:"docs",previous:{title:"Integrating into your app",permalink:"/laravel-fbt/docs/getting_started"},next:{title:"The FBT API",permalink:"/laravel-fbt/docs/api_intro"}},l=[{value:"Be Descriptive",id:"be-descriptive",children:[]},{value:"Reuse Common Elements",id:"reuse-common-elements",children:[]},{value:"Avoid Translating Markup",id:"avoid-translating-markup",children:[]},{value:"Use CSS instead of Markup",id:"use-css-instead-of-markup",children:[]},{value:"Avoid Layouts Relying on Precise Sizing",id:"avoid-layouts-relying-on-precise-sizing",children:[]},{value:"Avoid Long Pieces of Text",id:"avoid-long-pieces-of-text",children:[]},{value:"Assume Word Order Will Change",id:"assume-word-order-will-change",children:[]},{value:"Avoid Tiny Fonts",id:"avoid-tiny-fonts",children:[]},{value:"Don&#39;t Hardcode Punctuation",id:"dont-hardcode-punctuation",children:[]},{value:"Using Icons Instead of Images with Text",id:"using-icons-instead-of-images-with-text",children:[]}],c={rightToc:l};function b(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},c,a,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Here are some rough guidelines and lessons learned by the internationalization team at Facebook. These are in no specific order of importance."),Object(o.b)("h2",{id:"be-descriptive"},"Be Descriptive"),Object(o.b)("p",null,Object(o.b)("del",{parentName:"p"},"The general rule we use is text under 20 characters needs to have a description."),' A word like "Poke" can vary if it is used as a noun or a verb. Facebook Translations works by creating a hash value from the text and description of the phrase. That means that even a slight change to the original text or description will cause your string to be counted as a completely new one. So err on the side of starting off with a complete description you won\'t have to clarify later.'),Object(o.b)("p",null,"Note that many translators prefer to use the bulk translation interface, so they will not see your text in the context of your application -- that means your descriptions need to give translators all the information they need to make correct translation decisions."),Object(o.b)("p",null,"For example, do this:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-php"}),'fbt("Name:", "Label for name of photo album")\n')),Object(o.b)("p",null,"Instead of this:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-php"}),'fbt("Name:", "")\n// or\nfbt("Name:", "Name")\n')),Object(o.b)("p",null,"In some languages, the word for ",Object(o.b)("em",{parentName:"p"},"name")," is different depending on whether it's the name of a person, a place, or an object. A description here allows a translator to choose the correct word for this label."),Object(o.b)("p",null,"Descriptions should usually indicate context as well as meaning (but see the next point). This is especially important for things like link text that are presented as part of a larger grammatical structure like a sentence."),Object(o.b)("p",null,"So do this:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-php"}),"fbt(\"{name}'s photos\", \"In, 'X's photos are ready to view.'\")\n")),Object(o.b)("p",null,"But not this:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-php"}),'fbt("{name}\'s photos", "")\n')),Object(o.b)("p",null,"In languages where nouns change depending on whether they're used as the subject or object of a sentence, this description will allow translators to use the correct form."),Object(o.b)("h2",{id:"reuse-common-elements"},"Reuse Common Elements"),Object(o.b)("p",null,"You should reuse common text and descriptions rather than repeating the same text over and over with different descriptions; it's less work for translators and will tend to result in higher-quality translations. This is sometimes slightly at odds with using specific descriptions; use your judgment about where to draw the line."),Object(o.b)("p",null,"So this:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-php"}),'fbt("Cancel", "Button/link: cancel an action")\n')),Object(o.b)("p",null,"Is usually better than this:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-php"}),'fbt("Cancel", "Button label: cancel sending a message to event owner")\n')),Object(o.b)("h2",{id:"avoid-translating-markup"},"Avoid Translating Markup"),Object(o.b)("p",null,"If you have two sentences and a ",Object(o.b)("inlineCode",{parentName:"p"},"<br />")," in between, split them up into two translatable phrases. Otherwise translators will be able to mess with your markup and the results may not be what you expect."),Object(o.b)("p",null,"However, if you really want to use a ",Object(o.b)("inlineCode",{parentName:"p"},"<br />"),", we recommend doing it this way:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-html"}),'<fbt desc="Multiple lines">\n    first line<fbt:param name="lineBreak"><br /></fbt:param>\n    second line<fbt:same-param name="lineBreak" />\n    last line.\n</fbt>\n')),Object(o.b)("h2",{id:"use-css-instead-of-markup"},"Use CSS instead of Markup"),Object(o.b)("p",null,'Use CSS rather than markup to confine text to particular parts of the page. (See also the next item.) For example, if you have the text "Next Page" and you want each word on a separate line, put it in a with a maximum width rather than putting a tag in between the two words. Don\'t split the text into separately translatable units since it will prevent translators from changing word order if needed.'),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Don't")," do this:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-php"}),'fbt("Next<br/>Page", "...")\n')),Object(o.b)("p",null,"Because a translator may ignore your formatting."),Object(o.b)("p",null,"And ",Object(o.b)("strong",{parentName:"p"},"don't")," do this:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-php"}),'fbt("Next", "...") . \'<br/>\' . fbt("Page", "...");\n')),Object(o.b)("p",null,'If a language needs the word for "Page" to come before the word for "Next", it is impossible to translate correctly.'),Object(o.b)("p",null,"Rather, do ",Object(o.b)("strong",{parentName:"p"},"this"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-html"}),'<div class="limited-width-box">\' . fbt("Next Page", "...") . \'</div>\n')),Object(o.b)("p",null,"With appropriate CSS, the browser will word-wrap the string appropriately."),Object(o.b)("h2",{id:"avoid-layouts-relying-on-precise-sizing"},"Avoid Layouts Relying on Precise Sizing"),Object(o.b)("p",null,"Try not to use layouts that depend on the precise onscreen sizes of pieces of text in the original language. For any piece of text, in some languages it is likely to be shorter and in some it will be longer (sometimes significantly so in either direction.) If you have sized your user interface elements such that your text just barely fits, your application will probably not work well in a language with longer words."),Object(o.b)("h2",{id:"avoid-long-pieces-of-text"},"Avoid Long Pieces of Text"),Object(o.b)("p",null,"Large chunks of text like multiple paragraphs should be split up among multiple ",Object(o.b)("inlineCode",{parentName:"p"},"<fbt>")," tags for ease of translation. Similarly, a single long paragraph should be broken up into several smaller paragraphs. This allows translation voting to more precisely pinpoint problems."),Object(o.b)("h2",{id:"assume-word-order-will-change"},"Assume Word Order Will Change"),Object(o.b)("p",null,"Assume that a translator will have to change the word order of every sentence. In particular, don't try to assemble sentences from smaller separately-translatable fragments, because even if you provide excellent descriptions, it's likely you will make it impossible for a translator to come up with a grammatically correct translation. Instead, expand all the possible cases out into separate translatable sentences and choose a complete sentence in your code."),Object(o.b)("p",null,"Here's a simple example to ",Object(o.b)("strong",{parentName:"p"},"avoid"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-html"}),'<fbt desc="...">You are eating</fbt> <fbt desc="...">at home.</fbt>\n<fbt desc="...">You are eating</fbt> <fbt desc="...">at a restaurant.</fbt>\n')),Object(o.b)("p",null,'Here the code is printing the beginning of the sentence, which doesn\'t change in English, then choosing one of two possible endings. This is impossible to translate correctly to Chinese, where the phrases for "at home" and "at a restaurant" need to come before the word for "eating".'),Object(o.b)("p",null,"In this case, use separate phrases:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-html"}),'<fbt desc="...">You are eating at home.</fbt>\n<fbt desc="...">You are eating at a restaurant.</fbt>\n')),Object(o.b)("p",null,"Here the code chooses one of two complete sentences. The translator can adjust the word order of both sentences as needed, and these can be correctly translated into every language."),Object(o.b)("p",null,'Along the lines of the previous item, if you have a phrase like "You have {number} photos." where you use the word "photo" when the number is 1, expand this out into separate complete sentences line, "You have one photo." and "You have {number} photos.", like this:'),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-html"}),'<fbt desc="...">You have <fbt:plural many="photos" showCount="ifMany" count="3">one photo</fbt:plural>.</fbt>\n')),Object(o.b)("h2",{id:"avoid-tiny-fonts"},"Avoid Tiny Fonts"),Object(o.b)("p",null,"Font sizes under 10 pixels can be difficult to read in some languages, especially Chinese and Japanese."),Object(o.b)("h2",{id:"dont-hardcode-punctuation"},"Don't Hardcode Punctuation"),Object(o.b)("p",null,"Different languages use different punctuation symbols; for example, Chinese has two different comma characters that are used in different contexts. In general if you allow translators to translate complete sentences (including periods and commas) this won't be as big an issue for you."),Object(o.b)("p",null,"So you ",Object(o.b)("strong",{parentName:"p"},"should")," include the punctuation within the fbt tags:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-html"}),'<fbt desc="...">You have mail.</fbt>\n')),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Don't")," exclude it from the tags:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-html"}),'<fbt desc="...">You have mail</fbt>.\n')),Object(o.b)("p",null,"Japanese translators, among others, will want to use their language's end-of-sentence character, which is not an English-style period."),Object(o.b)("p",null,"Similarly, you ",Object(o.b)("strong",{parentName:"p"},"should")," do this:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-html"}),'<fbt desc="Form label">Favorite color:</fbt> <input ...>\n')),Object(o.b)("p",null,"And ",Object(o.b)("strong",{parentName:"p"},"not")," do this:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-html"}),'<fbt desc="Form label">Favorite color</fbt>: <input ...>\n')),Object(o.b)("p",null,"Including the colon as part of the translatable string means translators can substitute another punctuation mark if applicable, or can insert whitespace between the text and the colon (as is done in French, for example.)"),Object(o.b)("h2",{id:"using-icons-instead-of-images-with-text"},"Using Icons Instead of Images with Text"),Object(o.b)("p",null,'Using icons rather than images with prerendered text can sometimes save you the trouble of having to generate your graphics in different languages. But be aware that some symbols are culture-specific and may not mean the same thing to people in different countries -- for example, a hand with a raised thumb indicates "good" in some cultures but is an obscene gesture in others. An icon whose meaning is obscure is actually worse than using untranslated text, since the latter can at least be looked up in a dictionary as a last resort.'),Object(o.b)("p",null,"Source: ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://wiki.developers.facebook.com/index.php/Platform_Internationalization_Best_Practices"}),"http://wiki.developers.facebook.com/index.php/Platform_Internationalization_Best_Practices")))}b.isMDXComponent=!0},87:function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return h}));var n=a(0),r=a.n(n);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=r.a.createContext({}),b=function(e){var t=r.a.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=b(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=b(a),d=n,h=p["".concat(s,".").concat(d)]||p[d]||u[d]||o;return a?r.a.createElement(h,i(i({ref:t},c),{},{components:a})):r.a.createElement(h,i({ref:t},c))}));function h(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,s=new Array(o);s[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:n,s[1]=i;for(var c=2;c<o;c++)s[c]=a[c];return r.a.createElement.apply(null,s)}return r.a.createElement.apply(null,a)}d.displayName="MDXCreateElement"}}]);