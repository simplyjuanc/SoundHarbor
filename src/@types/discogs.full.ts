type Artist = {
  anv: string;
  id: number;
  join: string;
  name: string;
  resource_url: string;
  role: string;
  tracks: string;
};

type Contributor = {
  resource_url: string;
  username: string;
};

type Rating = {
  average: number;
  count: number;
};

type Submitter = {
  resource_url: string;
  username: string;
};

type Company = {
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  name: string;
  resource_url: string;
};



type Image = {
  height: number;
  resource_url: string;
  type: string;
  uri: string;
  uri150: string;
  width: number;
};

type Label = {
  catno: string;
  entity_type: string;
  id: number;
  name: string;
  resource_url: string;
};

type Video = {
  description: string;
  duration: number;
  embed: boolean;
  title: string;
  uri: string;
};

type Format = {
  descriptions: string[];
  name: string;
  qty: string;
};

type Track = {
  duration: string;
  position: string;
  title: string;
  type_: string;
};


type Community = {
  contributors: Contributor[];
  data_quality: string;
  have: number;
  rating: Rating;
  status: string;
  submitter: Submitter;
  want: number;
};



type Identifier = {
  type: string;
  value: string;
};

type Release = {
  title: string;
  id: number;
  artists: Artist[];
  data_quality: string;
  thumb: string;
  community: Community;
  companies: Company[];
  country: string;
  date_added: string;
  date_changed: string;
  estimated_weight: number;
  extraartists: Artist[];
  format_quantity: number;
  formats: Format[];
  genres: string[];
  identifiers: Identifier[];
  images: Image[];
  labels: Label[];
  lowest_price: number;
  master_id: number;
  master_url: string;
  notes: string;
  num_for_sale: number;
  released: string;
  released_formatted: string;
  resource_url: string;
  series: any[]; // Adjust the type accordingly
  status: string;
  styles: string[];
  tracklist: Track[];
  uri: string;
  videos: Video[];
  year: number;
};
