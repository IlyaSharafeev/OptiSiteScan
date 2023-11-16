import { defineStore } from 'pinia';
import axios from 'axios';

export const useSearchStore = defineStore("search", () => {
    const tempData = {
        "lighthouseResult": {
            "requestedUrl": "https://map.onix-systems.com/",
            "finalUrl": "https://map.onix-systems.com/",
            "mainDocumentUrl": "https://map.onix-systems.com/",
            "finalDisplayedUrl": "https://map.onix-systems.com/login",
            "lighthouseVersion": "11.0.0",
            "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/119.0.6045.105 Safari/537.36",
            "fetchTime": "2023-11-16T19:42:40.140Z",
            "environment": {
                "networkUserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
                "hostUserAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/119.0.6045.105 Safari/537.36",
                "benchmarkIndex": 423
            },
            "runWarnings": [],
            "configSettings": {
                "emulatedFormFactor": "desktop",
                "formFactor": "desktop",
                "locale": "en-US",
                "onlyCategories": [
                    "performance"
                ],
                "channel": "lr"
            },
            "audits": {
                "uses-text-compression": {
                    "id": "uses-text-compression",
                    "title": "Enable text compression",
                    "description": "Text-based resources should be served with compression (gzip, deflate or brotli) to minimize total network bytes. [Learn more about text compression](https://developer.chrome.com/docs/lighthouse/performance/uses-text-compression/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "details": {
                        "overallSavingsBytes": 0,
                        "headings": [],
                        "items": [],
                        "sortedBy": [
                            "wastedBytes"
                        ],
                        "type": "opportunity",
                        "overallSavingsMs": 0,
                        "debugData": {
                            "metricSavings": {
                                "FCP": 0,
                                "LCP": 0
                            },
                            "type": "debugdata"
                        }
                    },
                    "numericValue": 0,
                    "numericUnit": "millisecond"
                },
                "long-tasks": {
                    "id": "long-tasks",
                    "title": "Avoid long main-thread tasks",
                    "description": "Lists the longest tasks on the main thread, useful for identifying worst contributors to input delay. [Learn how to avoid long main-thread tasks](https://web.dev/long-tasks-devtools/)",
                    "score": null,
                    "scoreDisplayMode": "informative",
                    "displayValue": "1 long task found",
                    "details": {
                        "headings": [
                            {
                                "valueType": "url",
                                "key": "url",
                                "label": "URL"
                            },
                            {
                                "valueType": "ms",
                                "key": "startTime",
                                "label": "Start Time",
                                "granularity": 1
                            },
                            {
                                "label": "Duration",
                                "valueType": "ms",
                                "granularity": 1,
                                "key": "duration"
                            }
                        ],
                        "items": [
                            {
                                "url": "https://map.onix-systems.com/",
                                "startTime": 1800,
                                "duration": 50
                            }
                        ],
                        "sortedBy": [
                            "duration"
                        ],
                        "debugData": {
                            "tasks": [
                                {
                                    "scriptEvaluation": 0,
                                    "other": 50,
                                    "styleLayout": 0,
                                    "duration": 50,
                                    "startTime": 1800,
                                    "urlIndex": 0
                                }
                            ],
                            "urls": [
                                "https://map.onix-systems.com/"
                            ],
                            "type": "debugdata"
                        },
                        "type": "table",
                        "skipSumming": [
                            "startTime"
                        ]
                    }
                },
                "uses-rel-preconnect": {
                    "id": "uses-rel-preconnect",
                    "title": "Preconnect to required origins",
                    "description": "Consider adding `preconnect` or `dns-prefetch` resource hints to establish early connections to important third-party origins. [Learn how to preconnect to required origins](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "details": {
                        "overallSavingsMs": 0,
                        "type": "opportunity",
                        "sortedBy": [
                            "wastedMs"
                        ],
                        "headings": [],
                        "items": []
                    },
                    "warnings": [],
                    "numericValue": 0,
                    "numericUnit": "millisecond"
                },
                "uses-passive-event-listeners": {
                    "id": "uses-passive-event-listeners",
                    "title": "Uses passive listeners to improve scrolling performance",
                    "description": "Consider marking your touch and wheel event listeners as `passive` to improve your page's scroll performance. [Learn more about adopting passive event listeners](https://developer.chrome.com/docs/lighthouse/best-practices/uses-passive-event-listeners/).",
                    "score": 1,
                    "scoreDisplayMode": "binary",
                    "details": {
                        "type": "table",
                        "headings": [],
                        "items": []
                    }
                },
                "third-party-facades": {
                    "id": "third-party-facades",
                    "title": "Lazy load third-party resources with facades",
                    "description": "Some third-party embeds can be lazy loaded. Consider replacing them with a facade until they are required. [Learn how to defer third-parties with a facade](https://developer.chrome.com/docs/lighthouse/performance/third-party-facades/).",
                    "score": null,
                    "scoreDisplayMode": "notApplicable"
                },
                "largest-contentful-paint-element": {
                    "id": "largest-contentful-paint-element",
                    "title": "Largest Contentful Paint element",
                    "description": "This is the largest contentful element painted within the viewport. [Learn more about the Largest Contentful Paint element](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/)",
                    "score": null,
                    "scoreDisplayMode": "informative",
                    "displayValue": "2,520 ms",
                    "details": {
                        "type": "list",
                        "items": [
                            {
                                "headings": [
                                    {
                                        "valueType": "node",
                                        "label": "Element",
                                        "key": "node"
                                    }
                                ],
                                "items": [
                                    {
                                        "node": {
                                            "snippet": "<h1 data-v-3c5b20fc=\"\">",
                                            "selector": "div#app > div.login-block > header > h1",
                                            "nodeLabel": "Welcome to HYDRA.onixmap",
                                            "type": "node",
                                            "boundingRect": {
                                                "width": 486,
                                                "left": 432,
                                                "bottom": 440,
                                                "height": 44,
                                                "right": 918,
                                                "top": 396
                                            },
                                            "path": "1,HTML,1,BODY,2,DIV,0,DIV,0,DIV,0,HEADER,0,H1",
                                            "lhId": "page-0-H1"
                                        }
                                    }
                                ],
                                "type": "table"
                            },
                            {
                                "headings": [
                                    {
                                        "valueType": "text",
                                        "key": "phase",
                                        "label": "Phase"
                                    },
                                    {
                                        "valueType": "text",
                                        "label": "% of LCP",
                                        "key": "percent"
                                    },
                                    {
                                        "label": "Timing",
                                        "valueType": "ms",
                                        "key": "timing"
                                    }
                                ],
                                "type": "table",
                                "items": [
                                    {
                                        "phase": "TTFB",
                                        "percent": "12%",
                                        "timing": 308
                                    },
                                    {
                                        "phase": "Load Delay",
                                        "timing": 0,
                                        "percent": "0%"
                                    },
                                    {
                                        "percent": "0%",
                                        "phase": "Load Time",
                                        "timing": 0
                                    },
                                    {
                                        "timing": 2213,
                                        "percent": "88%",
                                        "phase": "Render Delay"
                                    }
                                ]
                            }
                        ]
                    }
                },
                "no-document-write": {
                    "id": "no-document-write",
                    "title": "Avoids `document.write()`",
                    "description": "For users on slow connections, external scripts dynamically injected via `document.write()` can delay page load by tens of seconds. [Learn how to avoid document.write()](https://developer.chrome.com/docs/lighthouse/best-practices/no-document-write/).",
                    "score": 1,
                    "scoreDisplayMode": "binary",
                    "details": {
                        "headings": [],
                        "type": "table",
                        "items": []
                    }
                },
                "first-contentful-paint": {
                    "id": "first-contentful-paint",
                    "title": "First Contentful Paint",
                    "description": "First Contentful Paint marks the time at which the first text or image is painted. [Learn more about the First Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/).",
                    "score": 0.38,
                    "scoreDisplayMode": "numeric",
                    "displayValue": "1.8 s",
                    "numericValue": 1812,
                    "numericUnit": "millisecond"
                },
                "uses-optimized-images": {
                    "id": "uses-optimized-images",
                    "title": "Efficiently encode images",
                    "description": "Optimized images load faster and consume less cellular data. [Learn how to efficiently encode images](https://developer.chrome.com/docs/lighthouse/performance/uses-optimized-images/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "details": {
                        "overallSavingsBytes": 0,
                        "sortedBy": [
                            "wastedBytes"
                        ],
                        "debugData": {
                            "metricSavings": {
                                "LCP": 0,
                                "FCP": 0
                            },
                            "type": "debugdata"
                        },
                        "headings": [],
                        "overallSavingsMs": 0,
                        "type": "opportunity",
                        "items": []
                    },
                    "warnings": [],
                    "numericValue": 0,
                    "numericUnit": "millisecond"
                },
                "timing-budget": {
                    "id": "timing-budget",
                    "title": "Timing budget",
                    "description": "Set a timing budget to help you keep an eye on the performance of your site. Performant sites load fast and respond to user input events quickly. [Learn more about performance budgets](https://developers.google.com/web/tools/lighthouse/audits/budgets).",
                    "score": null,
                    "scoreDisplayMode": "notApplicable"
                },
                "network-rtt": {
                    "id": "network-rtt",
                    "title": "Network Round Trip Times",
                    "description": "Network round trip times (RTT) have a large impact on performance. If the RTT to an origin is high, it's an indication that servers closer to the user could improve performance. [Learn more about the Round Trip Time](https://hpbn.co/primer-on-latency-and-bandwidth/).",
                    "score": null,
                    "scoreDisplayMode": "informative",
                    "displayValue": "220 ms",
                    "details": {
                        "headings": [
                            {
                                "valueType": "text",
                                "key": "origin",
                                "label": "URL"
                            },
                            {
                                "granularity": 1,
                                "key": "rtt",
                                "label": "Time Spent",
                                "valueType": "ms"
                            }
                        ],
                        "items": [
                            {
                                "origin": "https://map.onix-systems.com",
                                "rtt": 222
                            },
                            {
                                "rtt": 0,
                                "origin": "https://accounts.google.com"
                            },
                            {
                                "rtt": 0,
                                "origin": "https://www.googletagmanager.com"
                            },
                            {
                                "origin": "https://www.google-analytics.com",
                                "rtt": 0
                            }
                        ],
                        "sortedBy": [
                            "rtt"
                        ],
                        "type": "table"
                    },
                    "numericValue": 222,
                    "numericUnit": "millisecond"
                },
                "total-byte-weight": {
                    "id": "total-byte-weight",
                    "title": "Avoids enormous network payloads",
                    "description": "Large network payloads cost users real money and are highly correlated with long load times. [Learn how to reduce payload sizes](https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "displayValue": "Total size was 553 KiB",
                    "details": {
                        "sortedBy": [
                            "totalBytes"
                        ],
                        "headings": [
                            {
                                "valueType": "url",
                                "label": "URL",
                                "key": "url"
                            },
                            {
                                "valueType": "bytes",
                                "label": "Transfer Size",
                                "key": "totalBytes"
                            }
                        ],
                        "items": [
                            {
                                "url": "https://map.onix-systems.com/js/811.814de5a7.js",
                                "totalBytes": 125122
                            },
                            {
                                "url": "https://map.onix-systems.com/fonts/Inter-Regular.221d92e0.woff2",
                                "totalBytes": 95027
                            },
                            {
                                "url": "https://map.onix-systems.com/js/chunk-vendors.00f36c9e.js",
                                "totalBytes": 86593
                            },
                            {
                                "url": "https://accounts.google.com/gsi/client",
                                "totalBytes": 80805
                            },
                            {
                                "totalBytes": 79746,
                                "url": "https://www.googletagmanager.com/gtag/js?id=G-LMPSZP5NML&l=dataLayer&cx=c"
                            },
                            {
                                "url": "https://www.googletagmanager.com/gtag/js?id=UA-160789644-1&l=dataLayer",
                                "totalBytes": 69256
                            },
                            {
                                "totalBytes": 21503,
                                "url": "https://www.google-analytics.com/analytics.js"
                            },
                            {
                                "totalBytes": 5541,
                                "url": "https://map.onix-systems.com/js/app.c284d860.js"
                            },
                            {
                                "url": "https://map.onix-systems.com/",
                                "totalBytes": 1296
                            },
                            {
                                "url": "https://map.onix-systems.com/css/app.7b25b344.css",
                                "totalBytes": 1010
                            }
                        ],
                        "type": "table"
                    },
                    "numericValue": 566628,
                    "numericUnit": "byte"
                },
                "render-blocking-resources": {
                    "id": "render-blocking-resources",
                    "title": "Eliminate render-blocking resources",
                    "description": "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles. [Learn how to eliminate render-blocking resources](https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "details": {
                        "type": "opportunity",
                        "overallSavingsMs": 0,
                        "headings": [],
                        "items": []
                    },
                    "numericValue": 0,
                    "numericUnit": "millisecond"
                },
                "font-display": {
                    "id": "font-display",
                    "title": "Ensure text remains visible during webfont load",
                    "description": "Leverage the `font-display` CSS feature to ensure text is user-visible while webfonts are loading. [Learn more about `font-display`](https://developer.chrome.com/docs/lighthouse/performance/font-display/).",
                    "score": 0,
                    "scoreDisplayMode": "binary",
                    "details": {
                        "items": [
                            {
                                "url": "https://map.onix-systems.com/fonts/Inter-Regular.221d92e0.woff2",
                                "wastedMs": 463.05599999427795
                            }
                        ],
                        "type": "table",
                        "headings": [
                            {
                                "valueType": "url",
                                "label": "URL",
                                "key": "url"
                            },
                            {
                                "valueType": "ms",
                                "label": "Potential Savings",
                                "key": "wastedMs"
                            }
                        ]
                    },
                    "warnings": []
                },
                "network-requests": {
                    "id": "network-requests",
                    "title": "Network Requests",
                    "description": "Lists the network requests that were made during page load.",
                    "score": null,
                    "scoreDisplayMode": "informative",
                    "details": {
                        "type": "table",
                        "headings": [
                            {
                                "valueType": "url",
                                "key": "url",
                                "label": "URL"
                            },
                            {
                                "valueType": "text",
                                "label": "Protocol",
                                "key": "protocol"
                            },
                            {
                                "granularity": 1,
                                "valueType": "ms",
                                "label": "Network Request Time",
                                "key": "networkRequestTime"
                            },
                            {
                                "label": "Network End Time",
                                "key": "networkEndTime",
                                "valueType": "ms",
                                "granularity": 1
                            },
                            {
                                "label": "Transfer Size",
                                "granularity": 1,
                                "key": "transferSize",
                                "displayUnit": "kb",
                                "valueType": "bytes"
                            },
                            {
                                "displayUnit": "kb",
                                "granularity": 1,
                                "label": "Resource Size",
                                "key": "resourceSize",
                                "valueType": "bytes"
                            },
                            {
                                "valueType": "text",
                                "label": "Status Code",
                                "key": "statusCode"
                            },
                            {
                                "label": "MIME Type",
                                "key": "mimeType",
                                "valueType": "text"
                            },
                            {
                                "label": "Resource Type",
                                "key": "resourceType",
                                "valueType": "text"
                            }
                        ],
                        "debugData": {
                            "type": "debugdata",
                            "networkStartTimeTs": 1121206414975.0002
                        },
                        "items": [
                            {
                                "sessionTargetType": "page",
                                "resourceType": "Document",
                                "resourceSize": 2309,
                                "protocol": "h2",
                                "url": "https://map.onix-systems.com/",
                                "statusCode": 200,
                                "transferSize": 1296,
                                "rendererStartTime": 0,
                                "entity": "onix-systems.com",
                                "priority": "VeryHigh",
                                "finished": true,
                                "networkEndTime": 615.441999912262,
                                "networkRequestTime": 1.303999900817871,
                                "experimentalFromMainFrame": true,
                                "mimeType": "text/html"
                            },
                            {
                                "networkEndTime": 1524.407999753952,
                                "networkRequestTime": 622.5869998931885,
                                "finished": true,
                                "resourceType": "Script",
                                "sessionTargetType": "page",
                                "mimeType": "application/javascript",
                                "rendererStartTime": 621.7119998931885,
                                "statusCode": 200,
                                "protocol": "h2",
                                "entity": "onix-systems.com",
                                "priority": "High",
                                "url": "https://map.onix-systems.com/js/chunk-vendors.00f36c9e.js",
                                "resourceSize": 241624,
                                "transferSize": 86593,
                                "experimentalFromMainFrame": true
                            },
                            {
                                "rendererStartTime": 622.2919998168945,
                                "finished": true,
                                "statusCode": 200,
                                "transferSize": 5541,
                                "resourceType": "Script",
                                "sessionTargetType": "page",
                                "entity": "onix-systems.com",
                                "protocol": "h2",
                                "resourceSize": 11650,
                                "networkRequestTime": 622.7599999904633,
                                "priority": "High",
                                "mimeType": "application/javascript",
                                "experimentalFromMainFrame": true,
                                "url": "https://map.onix-systems.com/js/app.c284d860.js",
                                "networkEndTime": 1229.0499999523163
                            },
                            {
                                "entity": "onix-systems.com",
                                "rendererStartTime": 622.6169998645782,
                                "statusCode": 200,
                                "protocol": "h2",
                                "resourceSize": 1664,
                                "experimentalFromMainFrame": true,
                                "url": "https://map.onix-systems.com/css/app.7b25b344.css",
                                "networkEndTime": 1228.4549996852875,
                                "sessionTargetType": "page",
                                "priority": "VeryHigh",
                                "finished": true,
                                "networkRequestTime": 623.1449997425079,
                                "mimeType": "text/css",
                                "transferSize": 1010,
                                "resourceType": "Stylesheet"
                            },
                            {
                                "transferSize": 80805,
                                "rendererStartTime": 622.9569997787476,
                                "networkRequestTime": 632.3909997940063,
                                "entity": "Other Google APIs/SDKs",
                                "url": "https://accounts.google.com/gsi/client",
                                "experimentalFromMainFrame": true,
                                "priority": "Low",
                                "networkEndTime": 657.1989998817444,
                                "resourceSize": 203980,
                                "finished": true,
                                "protocol": "h2",
                                "sessionTargetType": "page",
                                "resourceType": "Script",
                                "mimeType": "application/javascript",
                                "statusCode": 200
                            },
                            {
                                "resourceType": "Script",
                                "networkEndTime": 1594.5609998703003,
                                "networkRequestTime": 1570.3379998207092,
                                "priority": "Low",
                                "transferSize": 69256,
                                "mimeType": "application/javascript",
                                "protocol": "h2",
                                "statusCode": 200,
                                "entity": "Google Tag Manager",
                                "resourceSize": 190422,
                                "experimentalFromMainFrame": true,
                                "rendererStartTime": 1569.6139998435974,
                                "finished": true,
                                "url": "https://www.googletagmanager.com/gtag/js?id=UA-160789644-1&l=dataLayer",
                                "sessionTargetType": "page"
                            },
                            {
                                "url": "https://map.onix-systems.com/css/811.006dbdd2.css",
                                "transferSize": 729,
                                "rendererStartTime": 1589.936999797821,
                                "statusCode": 200,
                                "sessionTargetType": "page",
                                "networkEndTime": 1760.5809998512268,
                                "experimentalFromMainFrame": true,
                                "resourceSize": 950,
                                "resourceType": "Stylesheet",
                                "mimeType": "text/css",
                                "finished": true,
                                "priority": "VeryHigh",
                                "networkRequestTime": 1590.8180000782013,
                                "entity": "onix-systems.com",
                                "protocol": "h2"
                            },
                            {
                                "sessionTargetType": "page",
                                "networkEndTime": 2200.753999710083,
                                "transferSize": 125122,
                                "priority": "Low",
                                "entity": "onix-systems.com",
                                "networkRequestTime": 1591.5049998760223,
                                "experimentalFromMainFrame": true,
                                "rendererStartTime": 1591.0429997444153,
                                "url": "https://map.onix-systems.com/js/811.814de5a7.js",
                                "statusCode": 200,
                                "resourceSize": 407394,
                                "finished": true,
                                "protocol": "h2",
                                "resourceType": "Script",
                                "mimeType": "application/javascript"
                            },
                            {
                                "rendererStartTime": 1641.111999988556,
                                "finished": true,
                                "experimentalFromMainFrame": true,
                                "sessionTargetType": "page",
                                "networkEndTime": 1661.5039999485016,
                                "resourceSize": 222103,
                                "mimeType": "application/javascript",
                                "protocol": "h2",
                                "resourceType": "Script",
                                "networkRequestTime": 1641.9670000076294,
                                "transferSize": 79746,
                                "entity": "Google Tag Manager",
                                "priority": "Low",
                                "statusCode": 200,
                                "url": "https://www.googletagmanager.com/gtag/js?id=G-LMPSZP5NML&l=dataLayer&cx=c"
                            },
                            {
                                "statusCode": 200,
                                "resourceType": "Script",
                                "transferSize": 21503,
                                "priority": "Low",
                                "finished": true,
                                "sessionTargetType": "page",
                                "url": "https://www.google-analytics.com/analytics.js",
                                "entity": "Google Analytics",
                                "mimeType": "text/javascript",
                                "resourceSize": 52916,
                                "networkRequestTime": 1650.450999736786,
                                "protocol": "h2",
                                "rendererStartTime": 1649.358999967575,
                                "experimentalFromMainFrame": true,
                                "networkEndTime": 1655.8129999637604
                            },
                            {
                                "priority": "VeryLow",
                                "statusCode": -1,
                                "resourceSize": 0,
                                "resourceType": "Ping",
                                "transferSize": 0,
                                "experimentalFromMainFrame": true,
                                "sessionTargetType": "page",
                                "finished": true,
                                "url": "https://www.google-analytics.com/g/collect?v=2&tid=G-LMPSZP5NML&gtm=45je3b81v9111802786&_p=1700163761837&gcd=11l1l1l1l1&dma=0&cid=666867417.1700163762&ul=en-us&sr=800x600&ir=1&uaa=x86&uab=64&uafvl=HeadlessChrome%3B119.0.6045.105%7CChromium%3B119.0.6045.105%7CNot%253FA_Brand%3B24.0.0.0&uamb=0&uam=&uap=macOS&uapv=10.15.7&uaw=0&_eu=EAAI&_s=1&sid=1700163762&sct=1&seg=0&dl=https%3A%2F%2Fmap.onix-systems.com%2F&dt=Onix%20Map&en=page_view&_fv=1&_ss=1&tfd=1755",
                                "rendererStartTime": 1755.079999923706,
                                "networkRequestTime": 1755.079999923706,
                                "networkEndTime": 1757.6749999523163,
                                "entity": "Google Analytics"
                            },
                            {
                                "networkRequestTime": 2261.885999917984,
                                "statusCode": 200,
                                "finished": true,
                                "sessionTargetType": "page",
                                "experimentalFromMainFrame": true,
                                "resourceType": "Font",
                                "transferSize": 95027,
                                "mimeType": "font/woff2",
                                "priority": "VeryHigh",
                                "entity": "onix-systems.com",
                                "url": "https://map.onix-systems.com/fonts/Inter-Regular.221d92e0.woff2",
                                "resourceSize": 94748,
                                "networkEndTime": 2724.941999912262,
                                "rendererStartTime": 2261.2200000286102,
                                "protocol": "h2"
                            }
                        ]
                    }
                },
                "duplicated-javascript": {
                    "id": "duplicated-javascript",
                    "title": "Remove duplicate modules in JavaScript bundles",
                    "description": "Remove large, duplicate JavaScript modules from bundles to reduce unnecessary bytes consumed by network activity. ",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "details": {
                        "debugData": {
                            "type": "debugdata",
                            "metricSavings": {
                                "FCP": 0,
                                "LCP": 0
                            }
                        },
                        "overallSavingsBytes": 0,
                        "sortedBy": [
                            "wastedBytes"
                        ],
                        "headings": [],
                        "items": [],
                        "type": "opportunity",
                        "overallSavingsMs": 0
                    },
                    "numericValue": 0,
                    "numericUnit": "millisecond"
                },
                "server-response-time": {
                    "id": "server-response-time",
                    "title": "Initial server response time was short",
                    "description": "Keep the server response time for the main document short because all other requests depend on it. [Learn more about the Time to First Byte metric](https://developer.chrome.com/docs/lighthouse/performance/time-to-first-byte/).",
                    "score": 1,
                    "scoreDisplayMode": "binary",
                    "displayValue": "Root document took 150 ms",
                    "details": {
                        "headings": [
                            {
                                "valueType": "url",
                                "label": "URL",
                                "key": "url"
                            },
                            {
                                "label": "Time Spent",
                                "valueType": "timespanMs",
                                "key": "responseTime"
                            }
                        ],
                        "items": [
                            {
                                "url": "https://map.onix-systems.com/",
                                "responseTime": 148
                            }
                        ],
                        "type": "opportunity",
                        "overallSavingsMs": 48
                    },
                    "numericValue": 148,
                    "numericUnit": "millisecond"
                },
                "unminified-css": {
                    "id": "unminified-css",
                    "title": "Minify CSS",
                    "description": "Minifying CSS files can reduce network payload sizes. [Learn how to minify CSS](https://developer.chrome.com/docs/lighthouse/performance/unminified-css/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "details": {
                        "type": "opportunity",
                        "overallSavingsMs": 0,
                        "headings": [],
                        "items": [],
                        "overallSavingsBytes": 0,
                        "debugData": {
                            "type": "debugdata",
                            "metricSavings": {
                                "FCP": 0,
                                "LCP": 0
                            }
                        },
                        "sortedBy": [
                            "wastedBytes"
                        ]
                    },
                    "numericValue": 0,
                    "numericUnit": "millisecond"
                },
                "unused-css-rules": {
                    "id": "unused-css-rules",
                    "title": "Reduce unused CSS",
                    "description": "Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity. [Learn how to reduce unused CSS](https://developer.chrome.com/docs/lighthouse/performance/unused-css-rules/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "details": {
                        "headings": [],
                        "type": "opportunity",
                        "overallSavingsBytes": 0,
                        "items": [],
                        "overallSavingsMs": 0,
                        "sortedBy": [
                            "wastedBytes"
                        ],
                        "debugData": {
                            "type": "debugdata",
                            "metricSavings": {
                                "LCP": 0,
                                "FCP": 0
                            }
                        }
                    },
                    "numericValue": 0,
                    "numericUnit": "millisecond"
                },
                "cumulative-layout-shift": {
                    "id": "cumulative-layout-shift",
                    "title": "Cumulative Layout Shift",
                    "description": "Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more about the Cumulative Layout Shift metric](https://web.dev/cls/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "displayValue": "0",
                    "details": {
                        "type": "debugdata",
                        "items": [
                            {
                                "cumulativeLayoutShiftMainFrame": 0.00016917854172139043
                            }
                        ]
                    },
                    "numericValue": 0.00016917854172139043,
                    "numericUnit": "unitless"
                },
                "prioritize-lcp-image": {
                    "id": "prioritize-lcp-image",
                    "title": "Preload Largest Contentful Paint image",
                    "description": "If the LCP element is dynamically added to the page, you should preload the image in order to improve LCP. [Learn more about preloading LCP elements](https://web.dev/optimize-lcp/#optimize-when-the-resource-is-discovered).",
                    "score": null,
                    "scoreDisplayMode": "notApplicable"
                },
                "performance-budget": {
                    "id": "performance-budget",
                    "title": "Performance budget",
                    "description": "Keep the quantity and size of network requests under the targets set by the provided performance budget. [Learn more about performance budgets](https://developers.google.com/web/tools/lighthouse/audits/budgets).",
                    "score": null,
                    "scoreDisplayMode": "notApplicable"
                },
                "mainthread-work-breakdown": {
                    "id": "mainthread-work-breakdown",
                    "title": "Minimizes main-thread work",
                    "description": "Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to minimize main-thread work](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/)",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "displayValue": "0.3 s",
                    "details": {
                        "headings": [
                            {
                                "key": "groupLabel",
                                "label": "Category",
                                "valueType": "text"
                            },
                            {
                                "valueType": "ms",
                                "key": "duration",
                                "label": "Time Spent",
                                "granularity": 1
                            }
                        ],
                        "items": [
                            {
                                "duration": 211.0369999999998,
                                "groupLabel": "Script Evaluation",
                                "group": "scriptEvaluation"
                            },
                            {
                                "group": "other",
                                "groupLabel": "Other",
                                "duration": 46.92200000000001
                            },
                            {
                                "groupLabel": "Script Parsing & Compilation",
                                "duration": 21.694000000000003,
                                "group": "scriptParseCompile"
                            },
                            {
                                "duration": 8.889000000000001,
                                "groupLabel": "Style & Layout",
                                "group": "styleLayout"
                            },
                            {
                                "duration": 1.6169999999999995,
                                "groupLabel": "Parse HTML & CSS",
                                "group": "parseHTML"
                            },
                            {
                                "groupLabel": "Rendering",
                                "duration": 1.5989999999999998,
                                "group": "paintCompositeRender"
                            }
                        ],
                        "type": "table",
                        "sortedBy": [
                            "duration"
                        ]
                    },
                    "numericValue": 291.75799999999987,
                    "numericUnit": "millisecond"
                },
                "unsized-images": {
                    "id": "unsized-images",
                    "title": "Image elements have explicit `width` and `height`",
                    "description": "Set an explicit width and height on image elements to reduce layout shifts and improve CLS. [Learn how to set image dimensions](https://web.dev/optimize-cls/#images-without-dimensions)",
                    "score": null,
                    "scoreDisplayMode": "notApplicable",
                    "details": {
                        "items": [],
                        "type": "table",
                        "headings": []
                    }
                },
                "legacy-javascript": {
                    "id": "legacy-javascript",
                    "title": "Avoid serving legacy JavaScript to modern browsers",
                    "description": "Polyfills and transforms enable legacy browsers to use new JavaScript features. However, many aren't necessary for modern browsers. For your bundled JavaScript, adopt a modern script deployment strategy using module/nomodule feature detection to reduce the amount of code shipped to modern browsers, while retaining support for legacy browsers. [Learn how to use modern JavaScript](https://web.dev/publish-modern-javascript/)",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "displayValue": "Potential savings of 0 KiB",
                    "details": {
                        "overallSavingsMs": 0,
                        "overallSavingsBytes": 51,
                        "debugData": {
                            "metricSavings": {
                                "FCP": 0,
                                "LCP": 0
                            },
                            "type": "debugdata"
                        },
                        "sortedBy": [
                            "wastedBytes"
                        ],
                        "type": "opportunity",
                        "headings": [
                            {
                                "valueType": "url",
                                "subItemsHeading": {
                                    "valueType": "source-location",
                                    "key": "location"
                                },
                                "label": "URL",
                                "key": "url"
                            },
                            {
                                "valueType": "code",
                                "key": null,
                                "subItemsHeading": {
                                    "key": "signal"
                                }
                            },
                            {
                                "key": "wastedBytes",
                                "valueType": "bytes",
                                "label": "Potential Savings"
                            }
                        ],
                        "items": [
                            {
                                "wastedBytes": 51,
                                "subItems": {
                                    "items": [
                                        {
                                            "location": {
                                                "type": "source-location",
                                                "urlProvider": "network",
                                                "line": 8,
                                                "column": 50100,
                                                "url": "https://map.onix-systems.com/js/811.814de5a7.js"
                                            },
                                            "signal": "@babel/plugin-transform-classes"
                                        }
                                    ],
                                    "type": "subitems"
                                },
                                "url": "https://map.onix-systems.com/js/811.814de5a7.js",
                                "totalBytes": 0
                            }
                        ]
                    },
                    "numericValue": 0,
                    "numericUnit": "millisecond"
                },
                "dom-size": {
                    "id": "dom-size",
                    "title": "Avoids an excessive DOM size",
                    "description": "A large DOM will increase memory usage, cause longer [style calculations](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations), and produce costly [layout reflows](https://developers.google.com/speed/articles/reflow). [Learn how to avoid an excessive DOM size](https://developer.chrome.com/docs/lighthouse/performance/dom-size/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "displayValue": "10 elements",
                    "details": {
                        "items": [
                            {
                                "value": {
                                    "type": "numeric",
                                    "value": 10,
                                    "granularity": 1
                                },
                                "statistic": "Total DOM Elements"
                            },
                            {
                                "value": {
                                    "granularity": 1,
                                    "value": 7,
                                    "type": "numeric"
                                },
                                "statistic": "Maximum DOM Depth",
                                "node": {
                                    "type": "node",
                                    "boundingRect": {
                                        "width": 144,
                                        "height": 44,
                                        "top": 396,
                                        "left": 631,
                                        "right": 775,
                                        "bottom": 440
                                    },
                                    "lhId": "1-0-SPAN",
                                    "selector": "div.login-block > header > h1 > span",
                                    "nodeLabel": " HYDRA.",
                                    "path": "1,HTML,1,BODY,2,DIV,0,DIV,0,DIV,0,HEADER,0,H1,1,SPAN",
                                    "snippet": "<span data-v-3c5b20fc=\"\">"
                                }
                            },
                            {
                                "value": {
                                    "granularity": 1,
                                    "value": 3,
                                    "type": "numeric"
                                },
                                "node": {
                                    "boundingRect": {
                                        "top": 0,
                                        "bottom": 940,
                                        "left": 0,
                                        "height": 940,
                                        "right": 1350,
                                        "width": 1350
                                    },
                                    "snippet": "<body>",
                                    "selector": "body",
                                    "type": "node",
                                    "path": "1,HTML,1,BODY",
                                    "nodeLabel": "body",
                                    "lhId": "1-1-BODY"
                                },
                                "statistic": "Maximum Child Elements"
                            }
                        ],
                        "headings": [
                            {
                                "key": "statistic",
                                "label": "Statistic",
                                "valueType": "text"
                            },
                            {
                                "valueType": "node",
                                "key": "node",
                                "label": "Element"
                            },
                            {
                                "valueType": "numeric",
                                "label": "Value",
                                "key": "value"
                            }
                        ],
                        "type": "table"
                    },
                    "numericValue": 10,
                    "numericUnit": "element"
                },
                "modern-image-formats": {
                    "id": "modern-image-formats",
                    "title": "Serve images in next-gen formats",
                    "description": "Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption. [Learn more about modern image formats](https://developer.chrome.com/docs/lighthouse/performance/uses-webp-images/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "details": {
                        "overallSavingsMs": 0,
                        "type": "opportunity",
                        "headings": [],
                        "overallSavingsBytes": 0,
                        "items": [],
                        "sortedBy": [
                            "wastedBytes"
                        ],
                        "debugData": {
                            "type": "debugdata",
                            "metricSavings": {
                                "FCP": 0,
                                "LCP": 0
                            }
                        }
                    },
                    "warnings": [],
                    "numericValue": 0,
                    "numericUnit": "millisecond"
                },
                "efficient-animated-content": {
                    "id": "efficient-animated-content",
                    "title": "Use video formats for animated content",
                    "description": "Large GIFs are inefficient for delivering animated content. Consider using MPEG4/WebM videos for animations and PNG/WebP for static images instead of GIF to save network bytes. [Learn more about efficient video formats](https://developer.chrome.com/docs/lighthouse/performance/efficient-animated-content/)",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "details": {
                        "sortedBy": [
                            "wastedBytes"
                        ],
                        "items": [],
                        "debugData": {
                            "type": "debugdata",
                            "metricSavings": {
                                "FCP": 0,
                                "LCP": 0
                            }
                        },
                        "headings": [],
                        "overallSavingsBytes": 0,
                        "overallSavingsMs": 0,
                        "type": "opportunity"
                    },
                    "numericValue": 0,
                    "numericUnit": "millisecond"
                },
                "third-party-summary": {
                    "id": "third-party-summary",
                    "title": "Minimize third-party usage",
                    "description": "Third-party code can significantly impact load performance. Limit the number of redundant third-party providers and try to load third-party code after your page has primarily finished loading. [Learn how to minimize third-party impact](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/).",
                    "score": 1,
                    "scoreDisplayMode": "binary",
                    "displayValue": "Third-party code blocked the main thread for 0 ms",
                    "details": {
                        "isEntityGrouped": true,
                        "headings": [
                            {
                                "label": "Third-Party",
                                "valueType": "text",
                                "subItemsHeading": {
                                    "valueType": "url",
                                    "key": "url"
                                },
                                "key": "entity"
                            },
                            {
                                "key": "transferSize",
                                "subItemsHeading": {
                                    "key": "transferSize"
                                },
                                "granularity": 1,
                                "label": "Transfer Size",
                                "valueType": "bytes"
                            },
                            {
                                "subItemsHeading": {
                                    "key": "blockingTime"
                                },
                                "key": "blockingTime",
                                "valueType": "ms",
                                "label": "Main-Thread Blocking Time",
                                "granularity": 1
                            }
                        ],
                        "items": [
                            {
                                "mainThreadTime": 89.93000000000012,
                                "transferSize": 149002,
                                "entity": "Google Tag Manager",
                                "blockingTime": 0,
                                "subItems": {
                                    "type": "subitems",
                                    "items": [
                                        {
                                            "url": "https://www.googletagmanager.com/gtag/js?id=G-LMPSZP5NML&l=dataLayer&cx=c",
                                            "transferSize": 79746,
                                            "mainThreadTime": 46.59900000000004,
                                            "blockingTime": 0
                                        },
                                        {
                                            "transferSize": 69256,
                                            "mainThreadTime": 43.33100000000008,
                                            "url": "https://www.googletagmanager.com/gtag/js?id=UA-160789644-1&l=dataLayer",
                                            "blockingTime": 0
                                        }
                                    ]
                                }
                            },
                            {
                                "blockingTime": 0,
                                "entity": "Other Google APIs/SDKs",
                                "transferSize": 80805,
                                "mainThreadTime": 23.245000000000008,
                                "subItems": {
                                    "type": "subitems",
                                    "items": [
                                        {
                                            "transferSize": 80805,
                                            "mainThreadTime": 23.245000000000008,
                                            "url": "https://accounts.google.com/gsi/client",
                                            "blockingTime": 0
                                        }
                                    ]
                                }
                            },
                            {
                                "blockingTime": 0,
                                "entity": "Google Analytics",
                                "transferSize": 21503,
                                "subItems": {
                                    "items": [
                                        {
                                            "blockingTime": 0,
                                            "url": "https://www.google-analytics.com/analytics.js",
                                            "transferSize": 21503,
                                            "mainThreadTime": 16.247000000000003
                                        }
                                    ],
                                    "type": "subitems"
                                },
                                "mainThreadTime": 16.247000000000003
                            }
                        ],
                        "summary": {
                            "wastedMs": 0,
                            "wastedBytes": 251310
                        },
                        "type": "table"
                    }
                },
                "diagnostics": {
                    "id": "diagnostics",
                    "title": "Diagnostics",
                    "description": "Collection of useful page vitals.",
                    "score": null,
                    "scoreDisplayMode": "informative",
                    "details": {
                        "type": "debugdata",
                        "items": [
                            {
                                "totalByteWeight": 566628,
                                "numStylesheets": 2,
                                "totalTaskTime": 291.7579999999997,
                                "mainDocumentTransferSize": 1296,
                                "throughput": 74312437572.21852,
                                "numScripts": 7,
                                "maxServerLatency": 148,
                                "numTasksOver500ms": 0,
                                "numFonts": 1,
                                "rtt": 0,
                                "numTasksOver50ms": 1,
                                "numTasksOver100ms": 0,
                                "numRequests": 12,
                                "maxRtt": 222,
                                "numTasksOver10ms": 10,
                                "numTasks": 258,
                                "numTasksOver25ms": 3
                            }
                        ]
                    }
                },
                "layout-shift-elements": {
                    "id": "layout-shift-elements",
                    "title": "Avoid large layout shifts",
                    "description": "These DOM elements contribute most to the CLS of the page. [Learn how to improve CLS](https://web.dev/optimize-cls/)",
                    "score": null,
                    "scoreDisplayMode": "informative",
                    "displayValue": "4 elements found",
                    "details": {
                        "type": "table",
                        "items": [
                            {
                                "node": {
                                    "lhId": "page-1-SPAN",
                                    "boundingRect": {
                                        "left": 631,
                                        "width": 144,
                                        "right": 775,
                                        "top": 396,
                                        "height": 44,
                                        "bottom": 440
                                    },
                                    "path": "1,HTML,1,BODY,2,DIV,0,DIV,0,DIV,0,HEADER,0,H1,1,SPAN",
                                    "type": "node",
                                    "snippet": "<span data-v-3c5b20fc=\"\">",
                                    "nodeLabel": " HYDRA.",
                                    "selector": "div.login-block > header > h1 > span"
                                },
                                "score": 0.00006307080835984636
                            },
                            {
                                "node": {
                                    "snippet": "<header data-v-3c5b20fc=\"\">",
                                    "path": "1,HTML,1,BODY,2,DIV,0,DIV,0,DIV,0,HEADER",
                                    "selector": "div#app > div#app > div.login-block > header",
                                    "type": "node",
                                    "nodeLabel": "Welcome to HYDRA.onixmap",
                                    "boundingRect": {
                                        "top": 396,
                                        "bottom": 440,
                                        "left": 432,
                                        "right": 918,
                                        "width": 486,
                                        "height": 44
                                    },
                                    "lhId": "page-2-HEADER"
                                },
                                "score": 0.00006170309113216921
                            },
                            {
                                "node": {
                                    "snippet": "<button data-v-3c5b20fc=\"\" class=\"login\">",
                                    "nodeLabel": "Login with HYDRA passport",
                                    "path": "1,HTML,1,BODY,2,DIV,0,DIV,0,DIV,1,BUTTON",
                                    "boundingRect": {
                                        "right": 802,
                                        "bottom": 545,
                                        "left": 549,
                                        "width": 253,
                                        "top": 496,
                                        "height": 49
                                    },
                                    "selector": "div#app > div#app > div.login-block > button.login",
                                    "lhId": "page-3-BUTTON",
                                    "type": "node"
                                },
                                "score": 0.00003577128791458575
                            },
                            {
                                "node": {
                                    "selector": "div#app > div#app > div.login-block > footer",
                                    "boundingRect": {
                                        "top": 782,
                                        "right": 763,
                                        "bottom": 799,
                                        "left": 587,
                                        "width": 176,
                                        "height": 17
                                    },
                                    "type": "node",
                                    "lhId": "page-4-FOOTER",
                                    "snippet": "<footer data-v-3c5b20fc=\"\">",
                                    "nodeLabel": "Powered by ONIX systems",
                                    "path": "1,HTML,1,BODY,2,DIV,0,DIV,0,DIV,2,FOOTER"
                                },
                                "score": 0.000008633354314789107
                            }
                        ],
                        "headings": [
                            {
                                "label": "Element",
                                "valueType": "node",
                                "key": "node"
                            },
                            {
                                "granularity": 0.001,
                                "key": "score",
                                "valueType": "numeric",
                                "label": "CLS Contribution"
                            }
                        ]
                    }
                },
                "unused-javascript": {
                    "id": "unused-javascript",
                    "title": "Reduce unused JavaScript",
                    "description": "Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. [Learn how to reduce unused JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/).",
                    "score": 0.96,
                    "scoreDisplayMode": "numeric",
                    "displayValue": "Potential savings of 257 KiB",
                    "details": {
                        "items": [
                            {
                                "wastedBytes": 90750,
                                "totalBytes": 125122,
                                "wastedPercent": 72.52924744591125,
                                "url": "https://map.onix-systems.com/js/811.814de5a7.js"
                            },
                            {
                                "wastedBytes": 63679,
                                "wastedPercent": 78.80576527110502,
                                "url": "https://accounts.google.com/gsi/client",
                                "totalBytes": 80805
                            },
                            {
                                "totalBytes": 86593,
                                "wastedBytes": 47169,
                                "url": "https://map.onix-systems.com/js/chunk-vendors.00f36c9e.js",
                                "wastedPercent": 54.47256440823895
                            },
                            {
                                "url": "https://www.googletagmanager.com/gtag/js?id=UA-160789644-1&l=dataLayer",
                                "totalBytes": 69256,
                                "wastedBytes": 31221,
                                "wastedPercent": 45.07987522450137
                            },
                            {
                                "url": "https://www.googletagmanager.com/gtag/js?id=G-LMPSZP5NML&l=dataLayer&cx=c",
                                "wastedPercent": 37.67396208065627,
                                "wastedBytes": 30043,
                                "totalBytes": 79746
                            }
                        ],
                        "overallSavingsMs": 80,
                        "headings": [
                            {
                                "key": "url",
                                "subItemsHeading": {
                                    "valueType": "code",
                                    "key": "source"
                                },
                                "label": "URL",
                                "valueType": "url"
                            },
                            {
                                "subItemsHeading": {
                                    "key": "sourceBytes"
                                },
                                "key": "totalBytes",
                                "label": "Transfer Size",
                                "valueType": "bytes"
                            },
                            {
                                "key": "wastedBytes",
                                "subItemsHeading": {
                                    "key": "sourceWastedBytes"
                                },
                                "label": "Potential Savings",
                                "valueType": "bytes"
                            }
                        ],
                        "type": "opportunity",
                        "debugData": {
                            "metricSavings": {
                                "LCP": 340,
                                "FCP": 260
                            },
                            "type": "debugdata"
                        },
                        "overallSavingsBytes": 262862,
                        "sortedBy": [
                            "wastedBytes"
                        ]
                    },
                    "numericValue": 80,
                    "numericUnit": "millisecond"
                },
                "uses-rel-preload": {
                    "id": "uses-rel-preload",
                    "title": "Preload key requests",
                    "description": "Consider using `<link rel=preload>` to prioritize fetching resources that are currently requested later in page load. [Learn how to preload key requests](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preload/).",
                    "score": null,
                    "scoreDisplayMode": "notApplicable",
                    "details": {
                        "headings": [],
                        "type": "opportunity",
                        "overallSavingsMs": 0,
                        "items": []
                    }
                },
                "metrics": {
                    "id": "metrics",
                    "title": "Metrics",
                    "description": "Collects all available metrics.",
                    "score": null,
                    "scoreDisplayMode": "informative",
                    "details": {
                        "items": [
                            {
                                "observedLargestContentfulPaintTs": 1121208715502,
                                "observedCumulativeLayoutShiftMainFrame": 0.00016917854172139043,
                                "observedLargestContentfulPaint": 2301,
                                "observedFirstContentfulPaint": 2281,
                                "observedLoad": 2736,
                                "observedFirstMeaningfulPaint": 2281,
                                "observedFirstPaint": 2281,
                                "timeToFirstByte": 308,
                                "speedIndex": 2591,
                                "interactive": 1812,
                                "observedLargestContentfulPaintAllFrames": 2301,
                                "observedTimeOrigin": 0,
                                "observedFirstContentfulPaintAllFramesTs": 1121208696276,
                                "firstContentfulPaint": 1812,
                                "observedLoadTs": 1121209151143,
                                "cumulativeLayoutShift": 0.00016917854172139043,
                                "observedDomContentLoadedTs": 1121208006875,
                                "observedNavigationStart": 0,
                                "observedLargestContentfulPaintAllFramesTs": 1121208715502,
                                "observedTraceEnd": 5056,
                                "observedTimeOriginTs": 1121206414847,
                                "observedTraceEndTs": 1121211470367,
                                "observedFirstPaintTs": 1121208696276,
                                "observedSpeedIndexTs": 1121208773688,
                                "observedFirstVisualChangeTs": 1121208699847,
                                "observedFirstMeaningfulPaintTs": 1121208696276,
                                "firstMeaningfulPaint": 1812,
                                "observedLastVisualChange": 2751,
                                "totalBlockingTime": 0,
                                "observedSpeedIndex": 2359,
                                "observedDomContentLoaded": 1592,
                                "maxPotentialFID": 50,
                                "largestContentfulPaint": 2521,
                                "observedFirstContentfulPaintTs": 1121208696276,
                                "observedFirstContentfulPaintAllFrames": 2281,
                                "observedLastVisualChangeTs": 1121209165847,
                                "cumulativeLayoutShiftMainFrame": 0.00016917854172139043,
                                "observedFirstVisualChange": 2285,
                                "observedNavigationStartTs": 1121206414847,
                                "observedCumulativeLayoutShift": 0.00016917854172139043
                            },
                            {
                                "lcpInvalidated": false
                            }
                        ],
                        "type": "debugdata"
                    },
                    "numericValue": 1812,
                    "numericUnit": "millisecond"
                },
                "bootup-time": {
                    "id": "bootup-time",
                    "title": "JavaScript execution time",
                    "description": "Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to reduce Javascript execution time](https://developer.chrome.com/docs/lighthouse/performance/bootup-time/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "displayValue": "0.1 s",
                    "details": {
                        "items": [
                            {
                                "scriptParseCompile": 1.217,
                                "scripting": 53.45900000000004,
                                "total": 80.26500000000004,
                                "url": "https://map.onix-systems.com/"
                            }
                        ],
                        "summary": {
                            "wastedMs": 54.67600000000004
                        },
                        "headings": [
                            {
                                "valueType": "url",
                                "key": "url",
                                "label": "URL"
                            },
                            {
                                "key": "total",
                                "valueType": "ms",
                                "granularity": 1,
                                "label": "Total CPU Time"
                            },
                            {
                                "valueType": "ms",
                                "granularity": 1,
                                "key": "scripting",
                                "label": "Script Evaluation"
                            },
                            {
                                "granularity": 1,
                                "valueType": "ms",
                                "label": "Script Parse",
                                "key": "scriptParseCompile"
                            }
                        ],
                        "type": "table",
                        "sortedBy": [
                            "total"
                        ]
                    },
                    "numericValue": 54.67600000000004,
                    "numericUnit": "millisecond"
                },
                "redirects": {
                    "id": "redirects",
                    "title": "Avoid multiple page redirects",
                    "description": "Redirects introduce additional delays before the page can be loaded. [Learn how to avoid page redirects](https://developer.chrome.com/docs/lighthouse/performance/redirects/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "details": {
                        "headings": [],
                        "type": "opportunity",
                        "items": [],
                        "overallSavingsMs": 0
                    },
                    "numericValue": 0,
                    "numericUnit": "millisecond"
                },
                "max-potential-fid": {
                    "id": "max-potential-fid",
                    "title": "Max Potential First Input Delay",
                    "description": "The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more about the Maximum Potential First Input Delay metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-max-potential-fid/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "displayValue": "50 ms",
                    "numericValue": 50,
                    "numericUnit": "millisecond"
                },
                "offscreen-images": {
                    "id": "offscreen-images",
                    "title": "Defer offscreen images",
                    "description": "Consider lazy-loading offscreen and hidden images after all critical resources have finished loading to lower time to interactive. [Learn how to defer offscreen images](https://developer.chrome.com/docs/lighthouse/performance/offscreen-images/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "details": {
                        "items": [],
                        "type": "opportunity",
                        "sortedBy": [
                            "wastedBytes"
                        ],
                        "debugData": {
                            "type": "debugdata",
                            "metricSavings": {
                                "FCP": 0,
                                "LCP": 0
                            }
                        },
                        "headings": [],
                        "overallSavingsMs": 0,
                        "overallSavingsBytes": 0
                    },
                    "warnings": [],
                    "numericValue": 0,
                    "numericUnit": "millisecond"
                },
                "user-timings": {
                    "id": "user-timings",
                    "title": "User Timing marks and measures",
                    "description": "Consider instrumenting your app with the User Timing API to measure your app's real-world performance during key user experiences. [Learn more about User Timing marks](https://developer.chrome.com/docs/lighthouse/performance/user-timings/).",
                    "score": null,
                    "scoreDisplayMode": "notApplicable",
                    "details": {
                        "items": [],
                        "type": "table",
                        "headings": []
                    }
                },
                "unminified-javascript": {
                    "id": "unminified-javascript",
                    "title": "Minify JavaScript",
                    "description": "Minifying JavaScript files can reduce payload sizes and script parse time. [Learn how to minify JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unminified-javascript/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "details": {
                        "headings": [],
                        "sortedBy": [
                            "wastedBytes"
                        ],
                        "debugData": {
                            "metricSavings": {
                                "LCP": 0,
                                "FCP": 0
                            },
                            "type": "debugdata"
                        },
                        "overallSavingsMs": 0,
                        "overallSavingsBytes": 0,
                        "items": [],
                        "type": "opportunity"
                    },
                    "warnings": [],
                    "numericValue": 0,
                    "numericUnit": "millisecond"
                },
                "viewport": {
                    "id": "viewport",
                    "title": "Has a `<meta name=\"viewport\">` tag with `width` or `initial-scale`",
                    "description": "A `<meta name=\"viewport\">` not only optimizes your app for mobile screen sizes, but also prevents [a 300 millisecond delay to user input](https://developer.chrome.com/blog/300ms-tap-delay-gone-away/). [Learn more about using the viewport meta tag](https://developer.chrome.com/docs/lighthouse/pwa/viewport/).",
                    "score": 1,
                    "scoreDisplayMode": "binary",
                    "warnings": []
                },
                "main-thread-tasks": {
                    "id": "main-thread-tasks",
                    "title": "Tasks",
                    "description": "Lists the toplevel main thread tasks that executed during page load.",
                    "score": null,
                    "scoreDisplayMode": "informative",
                    "details": {
                        "headings": [
                            {
                                "valueType": "ms",
                                "granularity": 1,
                                "key": "startTime",
                                "label": "Start Time"
                            },
                            {
                                "key": "duration",
                                "label": "End Time",
                                "valueType": "ms",
                                "granularity": 1
                            }
                        ],
                        "type": "table",
                        "items": [
                            {
                                "duration": 11.916,
                                "startTime": 618.616
                            },
                            {
                                "startTime": 668.501,
                                "duration": 12.207
                            },
                            {
                                "startTime": 1542.057,
                                "duration": 50.256
                            },
                            {
                                "duration": 17.685,
                                "startTime": 1610.34
                            },
                            {
                                "startTime": 1628.054,
                                "duration": 22.507
                            },
                            {
                                "startTime": 1661.852,
                                "duration": 16.307
                            },
                            {
                                "startTime": 1695.894,
                                "duration": 44.909
                            },
                            {
                                "startTime": 1740.832,
                                "duration": 15.357
                            },
                            {
                                "duration": 40.015,
                                "startTime": 2220.794
                            },
                            {
                                "duration": 6.828,
                                "startTime": 2260.829
                            },
                            {
                                "startTime": 2725.706,
                                "duration": 12.429
                            }
                        ]
                    }
                },
                "lcp-lazy-loaded": {
                    "id": "lcp-lazy-loaded",
                    "title": "Largest Contentful Paint image was not lazily loaded",
                    "description": "Above-the-fold images that are lazily loaded render later in the page lifecycle, which can delay the largest contentful paint. [Learn more about optimal lazy loading](https://web.dev/lcp-lazy-loading/).",
                    "score": null,
                    "scoreDisplayMode": "notApplicable"
                },
                "uses-responsive-images": {
                    "id": "uses-responsive-images",
                    "title": "Properly size images",
                    "description": "Serve images that are appropriately-sized to save cellular data and improve load time. [Learn how to size images](https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "details": {
                        "debugData": {
                            "metricSavings": {
                                "FCP": 0,
                                "LCP": 0
                            },
                            "type": "debugdata"
                        },
                        "type": "opportunity",
                        "overallSavingsBytes": 0,
                        "sortedBy": [
                            "wastedBytes"
                        ],
                        "items": [],
                        "headings": [],
                        "overallSavingsMs": 0
                    },
                    "numericValue": 0,
                    "numericUnit": "millisecond"
                },
                "speed-index": {
                    "id": "speed-index",
                    "title": "Speed Index",
                    "description": "Speed Index shows how quickly the contents of a page are visibly populated. [Learn more about the Speed Index metric](https://developer.chrome.com/docs/lighthouse/performance/speed-index/).",
                    "score": 0.39,
                    "scoreDisplayMode": "numeric",
                    "displayValue": "2.6 s",
                    "numericValue": 2590.6129602243104,
                    "numericUnit": "millisecond"
                },
                "total-blocking-time": {
                    "id": "total-blocking-time",
                    "title": "Total Blocking Time",
                    "description": "Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more about the Total Blocking Time metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/).",
                    "score": 1,
                    "scoreDisplayMode": "numeric",
                    "displayValue": "0 ms",
                    "numericValue": 0,
                    "numericUnit": "millisecond"
                },
                "script-treemap-data": {
                    "id": "script-treemap-data",
                    "title": "Script Treemap Data",
                    "description": "Used for treemap app",
                    "score": null,
                    "scoreDisplayMode": "informative",
                    "details": {
                        "type": "treemap-data",
                        "nodes": [
                            {
                                "name": "https://accounts.google.com/gsi/client",
                                "resourceBytes": 203980,
                                "unusedBytes": 160748
                            },
                            {
                                "resourceBytes": 11139,
                                "name": "https://map.onix-systems.com/js/app.c284d860.js",
                                "children": [
                                    {
                                        "resourceBytes": 10288,
                                        "children": [
                                            {
                                                "children": [
                                                    {
                                                        "name": "enums/LocaleEnum.ts",
                                                        "resourceBytes": 55
                                                    },
                                                    {
                                                        "name": "App.vue?89f4",
                                                        "resourceBytes": 124
                                                    },
                                                    {
                                                        "resourceBytes": 342,
                                                        "name": "App.vue?cb76",
                                                        "unusedBytes": 116
                                                    },
                                                    {
                                                        "resourceBytes": 42,
                                                        "name": "App.vue"
                                                    },
                                                    {
                                                        "resourceBytes": 570,
                                                        "unusedBytes": 411,
                                                        "name": "registerServiceWorker.ts"
                                                    },
                                                    {
                                                        "name": "main.ts",
                                                        "unusedBytes": 11,
                                                        "resourceBytes": 308
                                                    },
                                                    {
                                                        "name": "router/index.ts",
                                                        "resourceBytes": 479,
                                                        "unusedBytes": 114
                                                    },
                                                    {
                                                        "name": "service",
                                                        "resourceBytes": 427,
                                                        "children": [
                                                            {
                                                                "name": "api.ts",
                                                                "resourceBytes": 325,
                                                                "unusedBytes": 163
                                                            },
                                                            {
                                                                "name": "passportApi.ts",
                                                                "resourceBytes": 102,
                                                                "unusedBytes": 97
                                                            }
                                                        ],
                                                        "unusedBytes": 260
                                                    },
                                                    {
                                                        "resourceBytes": 702,
                                                        "unusedBytes": 151,
                                                        "name": "store/modules/user.ts"
                                                    },
                                                    {
                                                        "resourceBytes": 2295,
                                                        "children": [
                                                            {
                                                                "name": "en.ts",
                                                                "resourceBytes": 1024
                                                            },
                                                            {
                                                                "name": "ua.ts",
                                                                "resourceBytes": 1124
                                                            },
                                                            {
                                                                "resourceBytes": 147,
                                                                "name": "i18n.ts"
                                                            }
                                                        ],
                                                        "name": "translations"
                                                    }
                                                ],
                                                "resourceBytes": 5344,
                                                "name": "./src",
                                                "unusedBytes": 1063
                                            },
                                            {
                                                "name": "webpack",
                                                "children": [
                                                    {
                                                        "resourceBytes": 170,
                                                        "name": "bootstrap"
                                                    },
                                                    {
                                                        "unusedBytes": 137,
                                                        "children": [
                                                            {
                                                                "name": "chunk loaded",
                                                                "resourceBytes": 373
                                                            },
                                                            {
                                                                "unusedBytes": 31,
                                                                "name": "compat get default export",
                                                                "resourceBytes": 113
                                                            },
                                                            {
                                                                "resourceBytes": 525,
                                                                "name": "create fake namespace object",
                                                                "unusedBytes": 74
                                                            },
                                                            {
                                                                "name": "define property getters",
                                                                "resourceBytes": 106
                                                            },
                                                            {
                                                                "name": "ensure chunk",
                                                                "resourceBytes": 109
                                                            },
                                                            {
                                                                "resourceBytes": 105,
                                                                "name": "get javascript chunk filename"
                                                            },
                                                            {
                                                                "name": "get mini-css chunk filename",
                                                                "resourceBytes": 99
                                                            },
                                                            {
                                                                "resourceBytes": 166,
                                                                "name": "global"
                                                            },
                                                            {
                                                                "resourceBytes": 67,
                                                                "name": "hasOwnProperty shorthand"
                                                            },
                                                            {
                                                                "resourceBytes": 769,
                                                                "name": "load script"
                                                            },
                                                            {
                                                                "name": "make namespace object",
                                                                "resourceBytes": 175
                                                            },
                                                            {
                                                                "name": "node module decorator",
                                                                "resourceBytes": 66
                                                            },
                                                            {
                                                                "name": "publicPath",
                                                                "resourceBytes": 7
                                                            },
                                                            {
                                                                "unusedBytes": 32,
                                                                "resourceBytes": 1176,
                                                                "name": "css loading"
                                                            },
                                                            {
                                                                "name": "jsonp chunk loading",
                                                                "resourceBytes": 857
                                                            }
                                                        ],
                                                        "resourceBytes": 4713,
                                                        "name": "runtime"
                                                    },
                                                    {
                                                        "resourceBytes": 61,
                                                        "name": "startup"
                                                    }
                                                ],
                                                "resourceBytes": 4944,
                                                "unusedBytes": 137
                                            }
                                        ],
                                        "name": "webpack:/map.onix-systems",
                                        "unusedBytes": 1200
                                    },
                                    {
                                        "resourceBytes": 851,
                                        "unusedBytes": 3,
                                        "name": "(unmapped)"
                                    }
                                ],
                                "unusedBytes": 1203
                            },
                            {
                                "name": "https://map.onix-systems.com/js/chunk-vendors.00f36c9e.js",
                                "unusedBytes": 131597,
                                "resourceBytes": 241584
                            },
                            {
                                "name": "https://www.googletagmanager.com/gtag/js?id=UA-160789644-1&l=dataLayer",
                                "resourceBytes": 190422,
                                "unusedBytes": 85842
                            },
                            {
                                "unusedBytes": 26128,
                                "name": "https://www.google-analytics.com/analytics.js",
                                "resourceBytes": 52916
                            },
                            {
                                "name": "https://www.googletagmanager.com/gtag/js?id=G-LMPSZP5NML&l=dataLayer&cx=c",
                                "unusedBytes": 83675,
                                "resourceBytes": 222103
                            },
                            {
                                "unusedBytes": 295474,
                                "resourceBytes": 407386,
                                "name": "https://map.onix-systems.com/js/811.814de5a7.js"
                            }
                        ]
                    }
                },
                "non-composited-animations": {
                    "id": "non-composited-animations",
                    "title": "Avoid non-composited animations",
                    "description": "Animations which are not composited can be janky and increase CLS. [Learn how to avoid non-composited animations](https://developer.chrome.com/docs/lighthouse/performance/non-composited-animations/)",
                    "score": null,
                    "scoreDisplayMode": "notApplicable",
                    "details": {
                        "type": "table",
                        "headings": [],
                        "items": []
                    }
                },
                "network-server-latency": {
                    "id": "network-server-latency",
                    "title": "Server Backend Latencies",
                    "description": "Server latencies can impact web performance. If the server latency of an origin is high, it's an indication the server is overloaded or has poor backend performance. [Learn more about server response time](https://hpbn.co/primer-on-web-performance/#analyzing-the-resource-waterfall).",
                    "score": null,
                    "scoreDisplayMode": "informative",
                    "displayValue": "150 ms",
                    "details": {
                        "items": [
                            {
                                "origin": "https://map.onix-systems.com",
                                "serverResponseTime": 148
                            },
                            {
                                "serverResponseTime": 12,
                                "origin": "https://www.googletagmanager.com"
                            },
                            {
                                "serverResponseTime": 10,
                                "origin": "https://accounts.google.com"
                            },
                            {
                                "origin": "https://www.google-analytics.com",
                                "serverResponseTime": 0
                            }
                        ],
                        "type": "table",
                        "headings": [
                            {
                                "label": "URL",
                                "key": "origin",
                                "valueType": "text"
                            },
                            {
                                "granularity": 1,
                                "label": "Time Spent",
                                "valueType": "ms",
                                "key": "serverResponseTime"
                            }
                        ],
                        "sortedBy": [
                            "serverResponseTime"
                        ]
                    },
                    "numericValue": 148,
                    "numericUnit": "millisecond"
                },
                "uses-long-cache-ttl": {
                    "id": "uses-long-cache-ttl",
                    "title": "Serve static assets with an efficient cache policy",
                    "description": "A long cache lifetime can speed up repeat visits to your page. [Learn more about efficient cache policies](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/).",
                    "score": 0.21,
                    "scoreDisplayMode": "numeric",
                    "displayValue": "7 resources found",
                    "details": {
                        "sortedBy": [
                            "totalBytes"
                        ],
                        "summary": {
                            "wastedBytes": 330149.25
                        },
                        "skipSumming": [
                            "cacheLifetimeMs"
                        ],
                        "headings": [
                            {
                                "label": "URL",
                                "key": "url",
                                "valueType": "url"
                            },
                            {
                                "displayUnit": "duration",
                                "label": "Cache TTL",
                                "key": "cacheLifetimeMs",
                                "valueType": "ms"
                            },
                            {
                                "label": "Transfer Size",
                                "displayUnit": "kb",
                                "granularity": 1,
                                "valueType": "bytes",
                                "key": "totalBytes"
                            }
                        ],
                        "type": "table",
                        "items": [
                            {
                                "cacheHitProbability": 0,
                                "wastedBytes": 125122,
                                "totalBytes": 125122,
                                "cacheLifetimeMs": 0,
                                "url": "https://map.onix-systems.com/js/811.814de5a7.js"
                            },
                            {
                                "cacheLifetimeMs": 0,
                                "totalBytes": 95027,
                                "cacheHitProbability": 0,
                                "wastedBytes": 95027,
                                "url": "https://map.onix-systems.com/fonts/Inter-Regular.221d92e0.woff2"
                            },
                            {
                                "totalBytes": 86593,
                                "cacheHitProbability": 0,
                                "wastedBytes": 86593,
                                "cacheLifetimeMs": 0,
                                "url": "https://map.onix-systems.com/js/chunk-vendors.00f36c9e.js"
                            },
                            {
                                "url": "https://map.onix-systems.com/js/app.c284d860.js",
                                "wastedBytes": 5541,
                                "cacheLifetimeMs": 0,
                                "totalBytes": 5541,
                                "cacheHitProbability": 0
                            },
                            {
                                "wastedBytes": 1010,
                                "url": "https://map.onix-systems.com/css/app.7b25b344.css",
                                "totalBytes": 1010,
                                "cacheLifetimeMs": 0,
                                "cacheHitProbability": 0
                            },
                            {
                                "cacheHitProbability": 0,
                                "cacheLifetimeMs": 0,
                                "wastedBytes": 729,
                                "url": "https://map.onix-systems.com/css/811.006dbdd2.css",
                                "totalBytes": 729
                            },
                            {
                                "cacheLifetimeMs": 7200000,
                                "totalBytes": 21503,
                                "wastedBytes": 16127.25,
                                "debugData": {
                                    "max-age": 7200,
                                    "type": "debugdata",
                                    "public": true
                                },
                                "url": "https://www.google-analytics.com/analytics.js",
                                "cacheHitProbability": 0.25
                            }
                        ]
                    },
                    "numericValue": 330149.25,
                    "numericUnit": "byte"
                },
                "critical-request-chains": {
                    "id": "critical-request-chains",
                    "title": "Avoid chaining critical requests",
                    "description": "The Critical Request Chains below show you what resources are loaded with a high priority. Consider reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load. [Learn how to avoid chaining critical requests](https://developer.chrome.com/docs/lighthouse/performance/critical-request-chains/).",
                    "score": null,
                    "scoreDisplayMode": "informative",
                    "displayValue": "3 chains found",
                    "details": {
                        "longestChain": {
                            "length": 3,
                            "duration": 2723.638000011444,
                            "transferSize": 95027
                        },
                        "chains": {
                            "462DA4EAEA7AF4F6A91210E67771B3D8": {
                                "children": {
                                    "41.4": {
                                        "children": {
                                            "41.10": {
                                                "request": {
                                                    "url": "https://map.onix-systems.com/fonts/Inter-Regular.221d92e0.woff2",
                                                    "endTime": 1121209.139917,
                                                    "responseReceivedTime": 1121209.139911,
                                                    "startTime": 1121208.676861,
                                                    "transferSize": 95027
                                                }
                                            }
                                        },
                                        "request": {
                                            "url": "https://map.onix-systems.com/css/app.7b25b344.css",
                                            "endTime": 1121207.64343,
                                            "responseReceivedTime": 1121207.643423,
                                            "startTime": 1121207.03812,
                                            "transferSize": 1010
                                        }
                                    },
                                    "41.3": {
                                        "children": {
                                            "41.17": {
                                                "request": {
                                                    "transferSize": 729,
                                                    "responseReceivedTime": 1121208.1755530003,
                                                    "url": "https://map.onix-systems.com/css/811.006dbdd2.css",
                                                    "startTime": 1121208.005793,
                                                    "endTime": 1121208.175556
                                                }
                                            }
                                        },
                                        "request": {
                                            "responseReceivedTime": 1121207.6440230003,
                                            "transferSize": 5541,
                                            "url": "https://map.onix-systems.com/js/app.c284d860.js",
                                            "endTime": 1121207.644025,
                                            "startTime": 1121207.037735
                                        }
                                    },
                                    "41.2": {
                                        "request": {
                                            "transferSize": 86593,
                                            "endTime": 1121207.939383,
                                            "startTime": 1121207.037562,
                                            "responseReceivedTime": 1121207.939378,
                                            "url": "https://map.onix-systems.com/js/chunk-vendors.00f36c9e.js"
                                        }
                                    }
                                },
                                "request": {
                                    "url": "https://map.onix-systems.com/",
                                    "responseReceivedTime": 1121207.030411,
                                    "endTime": 1121207.030417,
                                    "transferSize": 1296,
                                    "startTime": 1121206.416279
                                }
                            }
                        },
                        "type": "criticalrequestchain"
                    }
                },
                "largest-contentful-paint": {
                    "id": "largest-contentful-paint",
                    "title": "Largest Contentful Paint",
                    "description": "Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more about the Largest Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/)",
                    "score": 0.46,
                    "scoreDisplayMode": "numeric",
                    "displayValue": "2.5 s",
                    "numericValue": 2521,
                    "numericUnit": "millisecond"
                },
                "interactive": {
                    "id": "interactive",
                    "title": "Time to Interactive",
                    "description": "Time to Interactive is the amount of time it takes for the page to become fully interactive. [Learn more about the Time to Interactive metric](https://developer.chrome.com/docs/lighthouse/performance/interactive/).",
                    "score": 0.97,
                    "scoreDisplayMode": "numeric",
                    "displayValue": "1.8 s",
                    "numericValue": 1812,
                    "numericUnit": "millisecond"
                },
                "first-meaningful-paint": {
                    "id": "first-meaningful-paint",
                    "title": "First Meaningful Paint",
                    "description": "First Meaningful Paint measures when the primary content of a page is visible. [Learn more about the First Meaningful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-meaningful-paint/).",
                    "score": 0.38,
                    "scoreDisplayMode": "numeric",
                    "displayValue": "1.8 s",
                    "numericValue": 1812,
                    "numericUnit": "millisecond"
                }
            },
            "categories": {
                "performance": {
                    "id": "performance",
                    "title": "Performance",
                    "score": 0.74,
                    "auditRefs": [
                        {
                            "id": "first-contentful-paint",
                            "weight": 10,
                            "group": "metrics",
                            "acronym": "FCP",
                            "relevantAudits": [
                                "server-response-time",
                                "render-blocking-resources",
                                "redirects",
                                "critical-request-chains",
                                "uses-text-compression",
                                "uses-rel-preconnect",
                                "uses-rel-preload",
                                "font-display",
                                "unminified-javascript",
                                "unminified-css",
                                "unused-css-rules"
                            ]
                        },
                        {
                            "id": "largest-contentful-paint",
                            "weight": 25,
                            "group": "metrics",
                            "acronym": "LCP",
                            "relevantAudits": [
                                "server-response-time",
                                "render-blocking-resources",
                                "redirects",
                                "critical-request-chains",
                                "uses-text-compression",
                                "uses-rel-preconnect",
                                "uses-rel-preload",
                                "font-display",
                                "unminified-javascript",
                                "unminified-css",
                                "unused-css-rules",
                                "largest-contentful-paint-element",
                                "prioritize-lcp-image",
                                "unused-javascript",
                                "efficient-animated-content",
                                "total-byte-weight",
                                "lcp-lazy-loaded"
                            ]
                        },
                        {
                            "id": "total-blocking-time",
                            "weight": 30,
                            "group": "metrics",
                            "acronym": "TBT",
                            "relevantAudits": [
                                "long-tasks",
                                "third-party-summary",
                                "third-party-facades",
                                "bootup-time",
                                "mainthread-work-breakdown",
                                "dom-size",
                                "duplicated-javascript",
                                "legacy-javascript",
                                "viewport"
                            ]
                        },
                        {
                            "id": "cumulative-layout-shift",
                            "weight": 25,
                            "group": "metrics",
                            "acronym": "CLS",
                            "relevantAudits": [
                                "layout-shift-elements",
                                "non-composited-animations",
                                "unsized-images"
                            ]
                        },
                        {
                            "id": "speed-index",
                            "weight": 10,
                            "group": "metrics",
                            "acronym": "SI"
                        },
                        {
                            "id": "interactive",
                            "weight": 0,
                            "group": "hidden",
                            "acronym": "TTI"
                        },
                        {
                            "id": "max-potential-fid",
                            "weight": 0,
                            "group": "hidden"
                        },
                        {
                            "id": "first-meaningful-paint",
                            "weight": 0,
                            "group": "hidden",
                            "acronym": "FMP"
                        },
                        {
                            "id": "render-blocking-resources",
                            "weight": 0
                        },
                        {
                            "id": "uses-responsive-images",
                            "weight": 0
                        },
                        {
                            "id": "offscreen-images",
                            "weight": 0
                        },
                        {
                            "id": "unminified-css",
                            "weight": 0
                        },
                        {
                            "id": "unminified-javascript",
                            "weight": 0
                        },
                        {
                            "id": "unused-css-rules",
                            "weight": 0
                        },
                        {
                            "id": "unused-javascript",
                            "weight": 0
                        },
                        {
                            "id": "uses-optimized-images",
                            "weight": 0
                        },
                        {
                            "id": "modern-image-formats",
                            "weight": 0
                        },
                        {
                            "id": "uses-text-compression",
                            "weight": 0
                        },
                        {
                            "id": "uses-rel-preconnect",
                            "weight": 0
                        },
                        {
                            "id": "server-response-time",
                            "weight": 0
                        },
                        {
                            "id": "redirects",
                            "weight": 0
                        },
                        {
                            "id": "uses-rel-preload",
                            "weight": 0
                        },
                        {
                            "id": "efficient-animated-content",
                            "weight": 0
                        },
                        {
                            "id": "duplicated-javascript",
                            "weight": 0
                        },
                        {
                            "id": "legacy-javascript",
                            "weight": 0
                        },
                        {
                            "id": "prioritize-lcp-image",
                            "weight": 0
                        },
                        {
                            "id": "total-byte-weight",
                            "weight": 0
                        },
                        {
                            "id": "uses-long-cache-ttl",
                            "weight": 0
                        },
                        {
                            "id": "dom-size",
                            "weight": 0
                        },
                        {
                            "id": "critical-request-chains",
                            "weight": 0
                        },
                        {
                            "id": "user-timings",
                            "weight": 0
                        },
                        {
                            "id": "bootup-time",
                            "weight": 0
                        },
                        {
                            "id": "mainthread-work-breakdown",
                            "weight": 0
                        },
                        {
                            "id": "font-display",
                            "weight": 0
                        },
                        {
                            "id": "third-party-summary",
                            "weight": 0
                        },
                        {
                            "id": "third-party-facades",
                            "weight": 0
                        },
                        {
                            "id": "largest-contentful-paint-element",
                            "weight": 0
                        },
                        {
                            "id": "lcp-lazy-loaded",
                            "weight": 0
                        },
                        {
                            "id": "layout-shift-elements",
                            "weight": 0
                        },
                        {
                            "id": "uses-passive-event-listeners",
                            "weight": 0
                        },
                        {
                            "id": "no-document-write",
                            "weight": 0
                        },
                        {
                            "id": "long-tasks",
                            "weight": 0
                        },
                        {
                            "id": "non-composited-animations",
                            "weight": 0
                        },
                        {
                            "id": "unsized-images",
                            "weight": 0
                        },
                        {
                            "id": "viewport",
                            "weight": 0
                        },
                        {
                            "id": "performance-budget",
                            "weight": 0,
                            "group": "budgets"
                        },
                        {
                            "id": "timing-budget",
                            "weight": 0,
                            "group": "budgets"
                        },
                        {
                            "id": "network-requests",
                            "weight": 0,
                            "group": "hidden"
                        },
                        {
                            "id": "network-rtt",
                            "weight": 0,
                            "group": "hidden"
                        },
                        {
                            "id": "network-server-latency",
                            "weight": 0,
                            "group": "hidden"
                        },
                        {
                            "id": "main-thread-tasks",
                            "weight": 0,
                            "group": "hidden"
                        },
                        {
                            "id": "diagnostics",
                            "weight": 0,
                            "group": "hidden"
                        },
                        {
                            "id": "metrics",
                            "weight": 0,
                            "group": "hidden"
                        },
                        {
                            "id": "screenshot-thumbnails",
                            "weight": 0,
                            "group": "hidden"
                        },
                        {
                            "id": "final-screenshot",
                            "weight": 0,
                            "group": "hidden"
                        },
                        {
                            "id": "script-treemap-data",
                            "weight": 0,
                            "group": "hidden"
                        }
                    ]
                }
            },
            "categoryGroups": {
                "pwa-installable": {
                    "title": "Installable"
                },
                "best-practices-browser-compat": {
                    "title": "Browser Compatibility"
                },
                "diagnostics": {
                    "title": "Diagnostics",
                    "description": "More information about the performance of your application. These numbers don't [directly affect](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/) the Performance score."
                },
                "load-opportunities": {
                    "title": "Opportunities",
                    "description": "These suggestions can help your page load faster. They don't [directly affect](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/) the Performance score."
                },
                "a11y-language": {
                    "title": "Internationalization and localization",
                    "description": "These are opportunities to improve the interpretation of your content by users in different locales."
                },
                "a11y-tables-lists": {
                    "title": "Tables and lists",
                    "description": "These are opportunities to improve the experience of reading tabular or list data using assistive technology, like a screen reader."
                },
                "a11y-navigation": {
                    "title": "Navigation",
                    "description": "These are opportunities to improve keyboard navigation in your application."
                },
                "best-practices-general": {
                    "title": "General"
                },
                "a11y-aria": {
                    "title": "ARIA",
                    "description": "These are opportunities to improve the usage of ARIA in your application which may enhance the experience for users of assistive technology, like a screen reader."
                },
                "a11y-audio-video": {
                    "title": "Audio and video",
                    "description": "These are opportunities to provide alternative content for audio and video. This may improve the experience for users with hearing or vision impairments."
                },
                "metrics": {
                    "title": "Metrics"
                },
                "a11y-best-practices": {
                    "title": "Best practices",
                    "description": "These items highlight common accessibility best practices."
                },
                "budgets": {
                    "title": "Budgets",
                    "description": "Performance budgets set standards for the performance of your site."
                },
                "a11y-color-contrast": {
                    "title": "Contrast",
                    "description": "These are opportunities to improve the legibility of your content."
                },
                "pwa-optimized": {
                    "title": "PWA Optimized"
                },
                "best-practices-ux": {
                    "title": "User Experience"
                },
                "seo-crawl": {
                    "title": "Crawling and Indexing",
                    "description": "To appear in search results, crawlers need access to your app."
                },
                "seo-mobile": {
                    "title": "Mobile Friendly",
                    "description": "Make sure your pages are mobile friendly so users don’t have to pinch or zoom in order to read the content pages. [Learn how to make pages mobile-friendly](https://developers.google.com/search/mobile-sites/)."
                },
                "a11y-names-labels": {
                    "title": "Names and labels",
                    "description": "These are opportunities to improve the semantics of the controls in your application. This may enhance the experience for users of assistive technology, like a screen reader."
                },
                "seo-content": {
                    "title": "Content Best Practices",
                    "description": "Format your HTML in a way that enables crawlers to better understand your app’s content."
                },
                "best-practices-trust-safety": {
                    "title": "Trust and Safety"
                }
            },
            "timing": {
                "total": 11205.5
            },
            "i18n": {
                "rendererFormattedStrings": {
                    "varianceDisclaimer": "Values are estimated and may vary. The [performance score is calculated](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/) directly from these metrics.",
                    "opportunityResourceColumnLabel": "Opportunity",
                    "opportunitySavingsColumnLabel": "Estimated Savings",
                    "errorMissingAuditInfo": "Report error: no audit information",
                    "errorLabel": "Error!",
                    "warningHeader": "Warnings: ",
                    "passedAuditsGroupTitle": "Passed audits",
                    "notApplicableAuditsGroupTitle": "Not applicable",
                    "manualAuditsGroupTitle": "Additional items to manually check",
                    "toplevelWarningsMessage": "There were issues affecting this run of Lighthouse:",
                    "crcLongestDurationLabel": "Maximum critical path latency:",
                    "crcInitialNavigation": "Initial Navigation",
                    "lsPerformanceCategoryDescription": "[Lighthouse](https://developers.google.com/web/tools/lighthouse/) analysis of the current page on an emulated mobile network. Values are estimated and may vary.",
                    "labDataTitle": "Lab Data",
                    "warningAuditsGroupTitle": "Passed audits but with warnings",
                    "snippetExpandButtonLabel": "Expand snippet",
                    "snippetCollapseButtonLabel": "Collapse snippet",
                    "thirdPartyResourcesLabel": "Show 3rd-party resources",
                    "runtimeDesktopEmulation": "Emulated Desktop",
                    "runtimeMobileEmulation": "Emulated Moto G Power",
                    "runtimeNoEmulation": "No emulation",
                    "runtimeSettingsBenchmark": "Unthrottled CPU/Memory Power",
                    "runtimeSettingsCPUThrottling": "CPU throttling",
                    "runtimeSettingsDevice": "Device",
                    "runtimeSettingsNetworkThrottling": "Network throttling",
                    "runtimeSettingsUANetwork": "User agent (network)",
                    "runtimeUnknown": "Unknown",
                    "dropdownCopyJSON": "Copy JSON",
                    "dropdownDarkTheme": "Toggle Dark Theme",
                    "dropdownPrintExpanded": "Print Expanded",
                    "dropdownPrintSummary": "Print Summary",
                    "dropdownSaveGist": "Save as Gist",
                    "dropdownSaveHTML": "Save as HTML",
                    "dropdownSaveJSON": "Save as JSON",
                    "dropdownViewer": "Open in Viewer",
                    "footerIssue": "File an issue",
                    "throttlingProvided": "Provided by environment",
                    "calculatorLink": "See calculator.",
                    "runtimeSettingsAxeVersion": "Axe version",
                    "viewTreemapLabel": "View Treemap",
                    "showRelevantAudits": "Show audits relevant to:"
                }
            },
            "entities": [
                {
                    "name": "onix-systems.com",
                    "isFirstParty": true,
                    "isUnrecognized": true,
                    "origins": [
                        "https://map.onix-systems.com"
                    ]
                },
                {
                    "name": "Other Google APIs/SDKs",
                    "homepage": "https://developers.google.com/apis-explorer/#p/",
                    "category": "utility",
                    "origins": [
                        "https://accounts.google.com"
                    ]
                },
                {
                    "name": "Google Tag Manager",
                    "homepage": "https://marketingplatform.google.com/about/tag-manager/",
                    "category": "tag-manager",
                    "origins": [
                        "https://www.googletagmanager.com"
                    ]
                },
                {
                    "name": "Google Analytics",
                    "homepage": "https://marketingplatform.google.com/about/analytics/",
                    "category": "analytics",
                    "origins": [
                        "https://www.google-analytics.com"
                    ]
                }
            ]
        }
    }

    const scanURL = async (link: string) => {
        try {
            const response = await axios.post('https://opti-site-scan-backend.vercel.app', { link });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error scanning URL:', error);
            return null;
        }
    };

    return {
        tempData,
        scanURL,
    };
});
