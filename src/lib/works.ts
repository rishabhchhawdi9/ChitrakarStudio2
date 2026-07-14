export type Category = "Mural" | "Wall Art" | "Canvas" | "Interior" | "Portrait" | "Commercial";

export type Work = {
  id: string;
  url: string;
  title: string;
  category: Category;
  caption: string;
  description?: string;
  featured?: boolean;
  exclusive?: boolean;
};

export const works: Work[] = [
  {
    id: "w1",
    url: "https://i.pinimg.com/736x/63/6c/a3/636ca320b14be7718a311ca9cc148bab.jpg",
    title: "Jungle Reverie",
    category: "Mural",
    caption: "Hand-painted feature wall for a Faridabad residence.",
    featured: true,
  },
  {
    id: "w2",
    url: "https://i.pinimg.com/736x/02/d6/13/02d613abceb7a001e690272b9c852768.jpg",
    title: "Sunburst Motif",
    category: "Wall Art",
    caption: "Decorative motif for a boutique café.",
    featured: true,
  },
  {
    id: "w3",
    url: "https://i.pinimg.com/736x/c1/2b/e5/c12be50f50a870d0a9d8c10ebad897f0.jpg",
    title: "Study in Ochre",
    category: "Canvas",
    caption: "Original canvas, mixed media.",
    featured: true,
  },
  {
    id: "w4",
    url: "https://i.pinimg.com/736x/a0/8c/b7/a08cb757619335c16f5548e4e43bb0f5.jpg",
    title: "Restaurant Wall — Kilim",
    category: "Interior",
    caption: "Full interior styling with hand-painted panels.",
    featured: true,
  },
  {
    id: "w5",
    url: "https://i.pinimg.com/736x/06/1c/1e/061c1e5ab8bb7b74a65ce7b2f1981ab2.jpg",
    title: "Village Fresco",
    category: "Mural",
    caption: "Story-driven mural for a heritage café.",
  },
  {
    id: "w6",
    url: "https://i.pinimg.com/736x/97/e8/d8/97e8d8455fc2541f4f036c3946eb80a2.jpg",
    title: "Terrace Diner",
    category: "Interior",
    caption: "Restaurant terrace with painted arches.",
    featured: true,
  },
  {
    id: "w7",
    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=736&q=80",
    title: "Portrait Study I",
    category: "Portrait",
    caption: "Commissioned portrait, acrylic on canvas.",
  },
  {
    id: "w8",
    url: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=736&q=80",
    title: "Floral Chorus",
    category: "Wall Art",
    caption: "Layered floral wall for a stylist's studio.",
  },
  {
    id: "w9",
    url: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&w=736&q=80",
    title: "Still Life, Warm",
    category: "Canvas",
    caption: "Original canvas commissioned for a client home.",
  },
  {
    id: "w10",
    url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=736&q=80",
    title: "Kids' Room Safari",
    category: "Mural",
    caption: "Full-wall mural for a children's bedroom.",
    featured: true,
  },
  {
    id: "w11",
    url: "https://i.pinimg.com/736x/cf/02/0f/cf020fc96716b03d1e264dc7b2709375.jpg",
    title: "Brand Signage Wall",
    category: "Commercial",
    caption: "Brand identity hand-painted for a retail space.",
  },
  {
    id: "w12",
    url: "https://i.pinimg.com/736x/e5/e9/a3/e5e9a31e4ff64a8f81a2b240ee9bc456.jpg",
    title: "Peach & Palm",
    category: "Wall Art",
    caption: "Modern botanical for a wellness studio.",
  },
  {
    id: "w13",
    url: "https://i.pinimg.com/736x/98/5d/4f/985d4fc0206833521af35bbb3b4bc1ec.jpg",
    title: "Studio Notes",
    category: "Canvas",
    caption: "Work in progress from the studio wall.",
  },
  {
    id: "w14",
    url: "https://i.pinimg.com/736x/ba/b9/ee/bab9eee38e941dee5e3b42982f586665.jpg",
    title: "Café Corner",
    category: "Interior",
    caption: "Cozy nook painted end-to-end.",
  },
  {
    id: "w15",
    url: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=736&q=80",
    title: "Blue Hour",
    category: "Mural",
    caption: "Night-scene mural on an entryway wall.",
  },
  {
    id: "w16",
    url: "https://i.pinimg.com/736x/d9/e1/2b/d9e12b794138b6a228c74b9c89988168.jpg",
    title: "Canvas No. 23",
    category: "Canvas",
    caption: "Abstract composition, mixed media.",
  },
  {
    id: "w17",
    url: "https://i.pinimg.com/736x/49/ba/28/49ba281091d7624db74151a798a1568b.jpg",
    title: "Colour Study",
    category: "Canvas",
    caption: "Palette study, acrylic on board.",
  },
  {
    id: "w18",
    url: "https://i.pinimg.com/736x/0f/c8/d1/0fc8d15d2a53b1ae8ddf6dbaaeba3d19.jpg",
    title: "Detail Work",
    category: "Wall Art",
    caption: "Close-up of hand-lettered detail.",
  },
  {
    id: "w19",
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=736&q=80",
    title: "Sketchbook Page",
    category: "Portrait",
    caption: "Studio sketch from the working book.",
  },
  {
    id: "w20",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=736&q=80",
    title: "Portrait Study II",
    category: "Portrait",
    caption: "Portrait commission in progress.",
  },
  {
    id: "w21",
    url: "/__l5e/assets-v1/fd190e03-f395-4ef8-a202-32824b3b2cff/art1.jpg",
    title: "Symphony of Rust & Indigo",
    category: "Canvas",
    caption:
      "Tactile study of natural oxidation and fluid currents, showing the tense contrast between rust textures and deep indigo flows.",
  },
  {
    id: "w22",
    url: "/__l5e/assets-v1/8a032607-5695-434c-848a-f79239a8c720/art2.jpg",
    title: "Heavy Gesso Fissure",
    category: "Canvas",
    caption:
      "Macro detail of the central heavily-plastered fissure, showing the physical depth of the gesso on wood panel.",
  },
  {
    id: "w23",
    url: "/__l5e/assets-v1/746402fa-9e9f-4fc9-90fd-30e3103f24ac/art3.jpg",
    title: "Studio Raking Light Study",
    category: "Interior",
    caption:
      "Studio perspective under natural raking light, emphasizing the sculpted surface and physical contours.",
  },
  {
    id: "w24",
    url: "/__l5e/assets-v1/49a9fd98-2422-4b07-ac2f-e67b7222212b/art4.jpg",
    title: "Minimalist Living Installation",
    category: "Interior",
    caption:
      "Scale reference showcasing the finished abstract cradled wood panel installed in a modern neutral living room setting.",
  },
  {
    id: "w25",
    url: "/__l5e/assets-v1/9da52da2-da4e-4f3e-b2bb-49c7eba1da77/art6.jpg",
    title: "Ethereal Echoes of Silent Arcs",
    category: "Wall Art",
    caption:
      "Elegant composition featuring overlapping archways, sweeping geometric curves, and soft, muted cream gradients.",
  },
  {
    id: "w26",
    url: "/__l5e/assets-v1/86415dab-7062-4ab2-84c6-5ee65df50e86/art7.jpg",
    title: "Marble Dust Impasto",
    category: "Canvas",
    caption:
      "Tactile close-up of the dry impasto texture where the custom marble dust plaster meets the raw Belgian linen.",
  },
  {
    id: "w27",
    url: "/__l5e/assets-v1/22cdc4ce-8c59-446f-9f38-d44d3277e246/art8.jpg",
    title: "Warm Studio Horizon Light",
    category: "Interior",
    caption:
      "Warm afternoon light hitting the canvas in the studio, highlighting the dry, mineral texture and organic fabric weave.",
  },
  {
    id: "w28",
    url: "/__l5e/assets-v1/26fccac3-fe61-4272-8579-48c057d1a41d/art10.jpg",
    title: "Gallery Monumental Installation",
    category: "Interior",
    caption:
      "Gallery installation preview, displaying the monumental presence of the geometric arches against a dark wall.",
  },
  {
    id: "w29",
    url: "/__l5e/assets-v1/fb0e4be6-6ced-412e-b0a9-f3c17eb363ee/art11.jpg",
    title: "Fractured Horizon Main Panel",
    category: "Canvas",
    caption:
      "Main panel view illustrating the stark vertical divides, rough charcoal washes, and reflective gold leaf veins.",
  },
  {
    id: "w30",
    url: "/__l5e/assets-v1/d0a52f1a-ecf0-47a2-a0c7-961156c89029/art12.jpg",
    title: "Gold Leaf and Charcoal Horizon",
    category: "Canvas",
    caption:
      "Detailed landscape view demonstrating the transition of delicate 24k gold leafing into heavy charcoal dust layers.",
  },
  {
    id: "w31",
    url: "/__l5e/assets-v1/77a0ebbb-4d8d-4d0b-b861-edd7a86af551/art13.jpg",
    title: "Easel Graphite Gloss Study",
    category: "Interior",
    caption:
      "Angle view on the active easel showing the raw painterly edge treatment and reflective graphite gloss.",
  },
  {
    id: "w32",
    url: "/__l5e/assets-v1/6311e116-f8fd-4a9a-b69d-f903fb801c0b/art14.jpg",
    title: "24k Gold Leaf Crinkle Detail",
    category: "Canvas",
    caption:
      "Extreme close-up showing the shimmering, metallic crinkling of the 24k gold leaf layered over carbon.",
  },
  {
    id: "w33",
    url: "/__l5e/assets-v1/ab39f5bd-8327-440b-bf0b-0c8dee68ebc6/art15.jpg",
    title: "Primal Obsidian & Ochre Main Panel",
    category: "Canvas",
    caption:
      "Complete composition showing energetic soot-black strokes slicing across a warm sienna and natural ochre background.",
  },
  {
    id: "w34",
    url: "/__l5e/assets-v1/8ef86b8b-9101-4930-b57e-4b5241f70fc7/art16.jpg",
    title: "Volcanic Sand Charcoal Sweep",
    category: "Canvas",
    caption:
      "Close-up of the energetic charcoal sweep, revealing the underlying granular volcanic sand texture.",
  },
  {
    id: "w35",
    url: "/__l5e/assets-v1/7c21b286-cac7-46f1-8884-70a7898061c6/art17.jpg",
    title: "Sienna Glaze Layering",
    category: "Canvas",
    caption:
      "Detail showing transparent glaze layers of raw sienna built up over dark, dense acrylic gestures.",
  },
  {
    id: "w36",
    url: "/__l5e/assets-v1/025681a5-1ede-4001-b340-bab6fbe05e3c/art18.jpg",
    title: "Gallery-Wrap Finished Edge",
    category: "Interior",
    caption:
      "Framing view highlighting the raw, painted gallery-wrap edges of the museum-grade heavy canvas.",
  },
  {
    id: "w37",
    url: "/__l5e/assets-v1/6fc86596-e344-407b-a03e-88c66658a254/art19.jpg",
    title: "Monolithic Echoes Front View",
    category: "Canvas",
    caption:
      "Main front view highlighting the imposing, tall monolith, vertical mass, and subtle texture gradient.",
  },
  {
    id: "w38",
    url: "/__l5e/assets-v1/2cbf303d-2975-450f-82e9-37a35f0d83c0/art20.jpg",
    title: "Hand-Troweled Sculptural Relief",
    category: "Canvas",
    caption:
      "Texture close-up of the hand-troweled sculptural ridges running the full height of the dark block on linen.",
  },
  {
    id: "w39",
    url: "/__l5e/assets-v1/c49c3520-2c83-4987-9ab7-5d6f8519180c/art22.jpg",
    title: "Side-Lit Monolith Depth",
    category: "Interior",
    caption:
      "Studio photo capturing the depth of the relief shadow cast under soft side-window illumination.",
  },
  {
    id: "w40",
    url: "/__l5e/assets-v1/bd026e1f-273d-4057-b381-4f8ed9207588/art23.jpg",
    title: "Boardroom Scale Installation",
    category: "Commercial",
    caption:
      "Installed context showcasing the monolithic scale against a tall ceiling in a contemporary commercial boardroom.",
  },
  {
    id: "ex1",
    url: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
    title: "Live Edge Resin River Table",
    category: "Interior",
    caption: "Premium custom-built walnut wood slab slab with deep-sea turquoise resin pour.",
    exclusive: true,
  },
  {
    id: "ex2",
    url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    title: "Geometric Thread-Art Board",
    category: "Wall Art",
    caption: "Hand-spun silk thread architectural geometry over charred cedar panel.",
    exclusive: true,
  },
  {
    id: "ex3",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    title: "Textured Gesso & Brass Mandorla",
    category: "Canvas",
    caption: "Sculptural mineral relief featuring raw ochres and hand-beaten polished brass inlay.",
    exclusive: true,
  },
];

export const CATEGORIES: Category[] = [
  "Mural",
  "Wall Art",
  "Canvas",
  "Interior",
  "Portrait",
  "Commercial",
];

export const heroImage = "https://i.pinimg.com/736x/63/6c/a3/636ca320b14be7718a311ca9cc148bab.jpg";
export const portraitImage =
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=736&q=80";
