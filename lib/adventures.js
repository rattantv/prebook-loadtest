/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */

import AEMHeadless from '@adobe/aem-headless-client-js';
import { json } from 'react-router-dom';

export class AdventureClient {
  static fromEnv(env = process.env) {
    if (!this.__envClient) {
      const { NEXT_PUBLIC_AEM_HOST, NEXT_GRAPHQL_ENDPOINT } = env;
      this.__envClient = new AdventureClient({
        serviceURL: NEXT_PUBLIC_AEM_HOST,
        endpoint: NEXT_GRAPHQL_ENDPOINT,
      });
    }
    return this.__envClient;
  }
  constructor({ serviceURL, endpoint }) {
    this.aemHeadlessClient = new AEMHeadless({
      serviceURL,
      endpoint,
      auth: ['admin', 'admin'], // TODO: dynamically set auth based on AEM instance
      fetch
    });
  }

  async getAllAdventures() {
    const queryAdventuresAll = 'wknd-shared/adventures-all';
    const res = {
      "data": {
        "adventureList": {
          "items": [
            {
              "_path": "/content/dam/wknd-shared/en/adventures/bali-surf-camp/bali-surf-camp",
              "slug": "bali-surf-camp",
              "title": "Bali Surf Camp",
              "activity": "Surfing",
              "price": 5000,
              "tripLength": "6 Days",
              "primaryImage": {
                "_path": "/content/dam/wknd-shared/en/adventures/bali-surf-camp/adobestock-175749320.jpg",
                "_authorUrl": "http://localhost:4502/content/dam/wknd-shared/en/adventures/bali-surf-camp/adobestock-175749320.jpg",
                "_publishUrl": "http://localhost:4503/content/dam/wknd-shared/en/adventures/bali-surf-camp/adobestock-175749320.jpg",
                "mimeType": "image/jpeg",
                "width": 1600,
                "height": 899
              }
            },
            {
              "_path": "/content/dam/wknd-shared/en/adventures/beervana-portland/beervana-in-portland",
              "slug": "beervana-portland",
              "title": "Beervana in Portland",
              "activity": "Social",
              "price": 300,
              "tripLength": "1 Day",
              "primaryImage": {
                "_path": "/content/dam/wknd-shared/en/adventures/beervana-portland/adobestock-279232449.jpeg",
                "_authorUrl": "http://localhost:4502/content/dam/wknd-shared/en/adventures/beervana-portland/adobestock-279232449.jpeg",
                "_publishUrl": "http://localhost:4503/content/dam/wknd-shared/en/adventures/beervana-portland/adobestock-279232449.jpeg",
                "mimeType": "image/jpeg",
                "width": 1381,
                "height": 920
              }
            },
            {
              "_path": "/content/dam/wknd-shared/en/adventures/climbing-new-zealand/climbing-new-zealand",
              "slug": "climbing-new-zealand",
              "title": "Climbing New Zealand",
              "activity": "Rock Climbing",
              "price": 900,
              "tripLength": "2 Days",
              "primaryImage": {
                "_path": "/content/dam/wknd-shared/en/adventures/climbing-new-zealand/adobestock-140634652.jpeg",
                "_authorUrl": "http://localhost:4502/content/dam/wknd-shared/en/adventures/climbing-new-zealand/adobestock-140634652.jpeg",
                "_publishUrl": "http://localhost:4503/content/dam/wknd-shared/en/adventures/climbing-new-zealand/adobestock-140634652.jpeg",
                "mimeType": "image/jpeg",
                "width": 1293,
                "height": 862
              }
            },
            {
              "_path": "/content/dam/wknd-shared/en/adventures/colorado-rock-climbing/colorado-rock-climbing",
              "slug": "colorado-rock-climbing",
              "title": "Overnight Colorado Rock Climbing",
              "activity": "Rock Climbing",
              "price": 1000,
              "tripLength": "3 Days",
              "primaryImage": {
                "_path": "/content/dam/wknd-shared/en/adventures/colorado-rock-climbing/adobestock-241578158.jpg",
                "_authorUrl": "http://localhost:4502/content/dam/wknd-shared/en/adventures/colorado-rock-climbing/adobestock-241578158.jpg",
                "_publishUrl": "http://localhost:4503/content/dam/wknd-shared/en/adventures/colorado-rock-climbing/adobestock-241578158.jpg",
                "mimeType": "image/jpeg",
                "width": 1000,
                "height": 667
              }
            },
            {
              "_path": "/content/dam/wknd-shared/en/adventures/cycling-southern-utah/cycling-southern-utah",
              "slug": "cycling-southern-utah",
              "title": "Cycling Southern Utah",
              "activity": "Cycling",
              "price": 3000,
              "tripLength": "5 Days",
              "primaryImage": {
                "_path": "/content/dam/wknd-shared/en/adventures/cycling-southern-utah/adobestock-185324648.jpg",
                "_authorUrl": "http://localhost:4502/content/dam/wknd-shared/en/adventures/cycling-southern-utah/adobestock-185324648.jpg",
                "_publishUrl": "http://localhost:4503/content/dam/wknd-shared/en/adventures/cycling-southern-utah/adobestock-185324648.jpg",
                "mimeType": "image/jpeg",
                "width": 1000,
                "height": 667
              }
            },
            {
              "_path": "/content/dam/wknd-shared/en/adventures/napa-wine-tasting/napa-wine-tasting",
              "slug": "napa-wine-tasting",
              "title": "Napa Wine Tasting",
              "activity": "Social",
              "price": 152.59,
              "tripLength": "1 Day",
              "primaryImage": {
                "_path": "/content/dam/wknd-shared/en/adventures/napa-wine-tasting/adobestock-280313729.jpg",
                "_authorUrl": "http://localhost:4502/content/dam/wknd-shared/en/adventures/napa-wine-tasting/adobestock-280313729.jpg",
                "_publishUrl": "http://localhost:4503/content/dam/wknd-shared/en/adventures/napa-wine-tasting/adobestock-280313729.jpg",
                "mimeType": "image/jpeg",
                "width": 1000,
                "height": 563
              }
            }
          ]
        }
      }
    };
    return res;
  }

  async getAdventurePaths() {
    const res = await this.getAllAdventures();
    const adventures = res?.data?.adventureList?.items || [];
    const paths = adventures.map((item) => ({
      params: {
        path: [item.slug],
      }
    }));
    return paths;
  }

  async getAdventuresBySlug(slug) {
    const queryVariables = {'slug': slug};
    const queryAdventuresBySlug = 'wknd-shared/adventure-by-slug';
    const res = {
      "data": {
        "adventureList": {
          "items": [
            {
              "_path": "/content/dam/wknd-shared/en/adventures/bali-surf-camp/bali-surf-camp",
              "title": "Bali Surf Camp",
              "slug": "bali-surf-camp",
              "activity": "Surfing",
              "adventureType": "Overnight Trip",
              "price": 5000,
              "tripLength": "6 Days",
              "groupSize": 6,
              "difficulty": "Beginner",
              "primaryImage": {
                "_path": "/content/dam/wknd-shared/en/adventures/bali-surf-camp/adobestock-175749320.jpg",
                "_authorUrl": "http://localhost:4502/content/dam/wknd-shared/en/adventures/bali-surf-camp/adobestock-175749320.jpg",
                "_publishUrl": "http://localhost:4503/content/dam/wknd-shared/en/adventures/bali-surf-camp/adobestock-175749320.jpg",
                "mimeType": "image/jpeg",
                "width": 1600,
                "height": 899
              },
              "description": {
                "json": [
                  {
                    "nodeType": "paragraph",
                    "content": [
                      {
                        "nodeType": "text",
                        "value": "Surfing in Bali is on the bucket list of every surfer - whether you're a beginner or someone who's been surfing for decades, there will be a break to cater to your ability. Bali offers warm water, tropical vibes, awesome breaks and low cost expenses."
                      }
                    ]
                  },
                  {
                    "nodeType": "paragraph",
                    "content": [
                      {
                        "nodeType": "text",
                        "value": "Looking for a low cost alternative? Checkout "
                      },
                      {
                        "nodeType": "reference",
                        "data": {
                          "href": "/content/dam/wknd-shared/en/adventures/surf-camp-in-costa-rica/surf-camp-costa-rica",
                          "type": "fragment"
                        },
                        "value": "Surf Camp Costa Rica"
                      }
                    ]
                  }
                ],
                "plaintext": "Surfing in Bali is on the bucket list of every surfer - whether you're a beginner or someone who's been surfing for decades, there will be a break to cater to your ability. Bali offers warm water, tropical vibes, awesome breaks and low cost expenses.\n\nLooking for a low cost alternative? Checkout Surf Camp Costa Rica",
                "html": "<p>Surfing in Bali is on the bucket list of every surfer - whether you're a beginner or someone who's been surfing for decades, there will be a break to cater to your ability. Bali offers warm water, tropical vibes, awesome breaks and low cost expenses.</p>\n<p>Looking for a low cost alternative? Checkout&nbsp;<a href=\"/content/dam/wknd-shared/en/adventures/surf-camp-in-costa-rica/surf-camp-costa-rica\">Surf Camp Costa Rica</a></p>\n"
              },
              "itinerary": {
                "json": [
                  {
                    "nodeType": "paragraph",
                    "content": [
                      {
                        "nodeType": "text",
                        "value": "Keramas",
                        "format": {
                          "variants": [
                            "bold"
                          ]
                        }
                      }
                    ]
                  },
                  {
                    "nodeType": "paragraph",
                    "content": [
                      {
                        "nodeType": "text",
                        "value": "The most famous break in Bali is home to a WSL stop and features a fast barrelling right-hand reef break. One of Bali's most consistent waves, you'll have fun on waves from 2ft to 20 ft."
                      }
                    ]
                  },
                  {
                    "nodeType": "paragraph",
                    "content": [
                      {
                        "nodeType": "text",
                        "value": "Nusa Dua",
                        "format": {
                          "variants": [
                            "bold"
                          ]
                        }
                      }
                    ]
                  },
                  {
                    "nodeType": "paragraph",
                    "content": [
                      {
                        "nodeType": "text",
                        "value": "Home to the best right handers in Bali, Nusa Dua is famous for big wave surfing and is suitable for the advanced surfers in the group. The Nusa Dua reef has numerous waves that break on different tides and slightly different conditions."
                      }
                    ]
                  },
                  {
                    "nodeType": "paragraph",
                    "content": [
                      {
                        "nodeType": "text",
                        "value": "Sanur",
                        "format": {
                          "variants": [
                            "bold"
                          ]
                        }
                      }
                    ]
                  },
                  {
                    "nodeType": "paragraph",
                    "content": [
                      {
                        "nodeType": "text",
                        "value": "Located on the East coast, Sanur only breaks when there is a big swell and is at it's best when it's well overhead. Waves break over a very sharp reef so be prepared to leave some skin behind."
                      }
                    ]
                  }
                ],
                "plaintext": "Keramas\n\nThe most famous break in Bali is home to a WSL stop and features a fast barrelling right-hand reef break. One of Bali's most consistent waves, you'll have fun on waves from 2ft to 20 ft.\n\nNusa Dua\n\nHome to the best right handers in Bali, Nusa Dua is famous for big wave surfing and is suitable for the advanced surfers in the group. The Nusa Dua reef has numerous waves that break on different tides and slightly different conditions.\n\nSanur\n\nLocated on the East coast, Sanur only breaks when there is a big swell and is at it's best when it's well overhead. Waves break over a very sharp reef so be prepared to leave some skin behind.",
                "html": "<p><b>Keramas</b></p>\n<p>The most famous break in Bali is home to a WSL stop and features a fast barrelling right-hand reef break. One of Bali's most consistent waves, you'll have fun on waves from 2ft to 20 ft.</p>\n<p><b>Nusa Dua</b></p>\n<p>Home to the best right handers in Bali, Nusa Dua is famous for big wave surfing and is suitable for the advanced surfers in the group. The Nusa Dua reef has numerous waves that break on different tides and slightly different conditions.</p>\n<p><b>Sanur</b></p>\n<p>Located on the East coast, Sanur only breaks when there is a big swell and is at it's best when it's well overhead. Waves break over a very sharp reef so be prepared to leave some skin behind.</p>\n"
              }
            }
          ],
          "_references": [
            {
              "_path": "/content/dam/wknd-shared/en/adventures/surf-camp-in-costa-rica/surf-camp-costa-rica",
              "slug": "surf-camp-costa-rica",
              "title": "Surf Camp in Costa Rica",
              "price": 3400,
              "__typename": "AdventureModel"
            }
          ]
        }
      }
    }
    return res;
  }
}
