/*
// ==UserScript==
// @name WoW Board Helpers
// @description UserScript for the official WoW forum
// @match http://eu.battle.net/wow/fr/forum/*
// @match http://eu.battle.net/wow/en/forum/*
// @match http://us.battle.net/wow/en/forum/*
// @author Tel
// @version 4.0
// ==/UserScript==
 * changelog
 * 4.0.1
 *  Fix parse-time stupid mistake
 * 4.0
 *  SugarJS, FUCK YOU WORLD; YOLO
 *  Allow for multi-binds
 *  Crabby's dead
 * 3.3.1
 *  Fuck you crabby :)
 * 3.3
 *  MUH COMMONJS
 * 3.2
 *  Fix ALL the reply bugs
 * 3.1.1
 *  Even more perf improvements
 * 3.1
 *  Perf improvements
 * 3.0
 *  Switch to "JadeLS"
 *  End CommonJS-everywhere conversion
 *  Add a jump for new-topic unless banned
 * 2.0.6
 *  Do not remove class when MAR-ing
 * 2.0.5
 *  Improve MAR handling
 * 2.0.4
 *  Fix blizzard titlification
 * 2.0.3
 *  Fix for Firefox
 * 2.0.2
 *  Increase context-links margin
 * 2.0.1
 *  Fix youtube options
 * 2.0.0
 *  Rewrite with CommonJS
 * 1.9.3
 *  Do not autolink CM posts
 * 1.9.2
 *  Added "top" jump
 *  Added "login" jump
 * 1.9.1
 *  Perf improvements
 * 1.9
 *  Fixed a capturing bug with autolink
 *  Fixed a bug, probably creating another one, when the user does not
 *   have enough chars to get the "extended select menu"
 *  Added "HF" link in context links
 * 1.8
 *  Added the CheatSheet
 * 1.7.1
 *  Now the "other characters" list is hidden if bigger than post
 * 1.7
 *  Added `j` as a hotkey for "jump to unread" in topic
 *  Now display recognized alts of people ! (displays link)
 *  Split ALL the code !
 * 1.6.5
 *  post preview is now autolinked too
 *  extended autotitleing to everything in blizzard.net
 *   (everything out is prohibited because of xdomain policy)
 * 1.6.4
 *  Better french headers in ADV mode (takes less space)
 *  Fixed a bug when visiting a thread with #[0-9]+ in the url
 * 1.6.3
 *  Added a fix for blizzard's menu thinking JS has autovivification and shit
 *  Tweaked autolink for accents
 *  Changed ADV styling to please Lord Dryaan (jk he preps in rogue duels)
 * 1.6.2
 *  Now display forum links by their titles rather than their URL
 *  Now display characters by their realm/pseudo rather than their URL
 * 1.6.1
 *  Autolink now works against images too
 *  Rendering should be faster
 * 1.6.0
 *  Added relative time (updated every 10 seconds, should try to calculate when date will be stale)
 *  Make sure we aren't overriding a text in reply rememberer
 *  Checking for updates every 15s
 * 1.5.0
 *  Added the memebox, allowing you to select memes
 * 1.4.0
 *  Added autolink handling edge cases
 *   Also links youtube videos (iframe embedding)
 * 1.3.0
 *  Added `r` as hotkey for "quickquote"
 * 1.2.2
 *  Better handling of CMs
 * 1.2.1
 *  Redirects are moved at the end (before hidden topics)
 * 1.2
 *  Now allows to hide topics (not stickies),
 *   they'll just get moved to the bottom
 * 1.1
 *  Now automatically saves your textarea on input
 *   and clears saved data on submit
 *  Added an "X" button to clear textarea (+ saved data)
 *  Keeps css formatting, just in case
 * 1.0.1
 *  Now includes jade o/
 * 1.0.0
 *  Made it to the userscript build!
 * 0.8.1
 *  Made it work on chrome, won't override stuff etc
 *  Now uses localStorage for settings (instead of cookies)
 * 0.8
 *  Ability to Mark all as read
 *  Now compares last poster if post-count is somehow wrong
 *  Time is now simplified in ADV mode
 * 0.7
 *  Now hides stickies by default - togglable (stores user pref through cookie)
 * 0.6.2
 *  Disinlined
 *  Bold last poster's name, underline if us
 * 0.6.1
 *  Disabled blizzard's marking
 * 0.6
 *  Finally fixed the bug of "wrong count with deleted posts"
 *   the working solution is just to use .post-lastPost a[href] (ie blabla#354)
 *   This is still not working as intended when there's deleted posts (but that's definitely blizz's fault)
 *  Also splits correctly depending on the language used
 * 0.5
 *  Now adds annotations : [!] for new, [ASCII:check] for read and [?] for never went
 * 0.4
 *  Now works with advanced mode
 *  Fix a bug when logged off
*/
(function (global) {
    var process = function () {
            var cwd = '/';
            return {
                title: 'browser',
                version: 'v0.10.2',
                browser: true,
                env: {},
                argv: [],
                nextTick: function (fn) {
                    setTimeout(fn, 0);
                },
                cwd: function () {
                    return cwd;
                },
                chdir: function (dir) {
                    cwd = dir;
                }
            };
        }();
    function require(file, parentModule) {
        if ({}.hasOwnProperty.call(require.cache, file))
            return require.cache[file];
        var resolved = require.resolve(file);
        if (!resolved)
            throw new Error('Failed to resolve module ' + file);
        var module$ = {
                id: file,
                require: require,
                filename: file,
                exports: {},
                loaded: false,
                parent: parentModule,
                children: []
            };
        if (parentModule)
            parentModule.children.push(module$);
        var dirname = file.slice(0, file.lastIndexOf('/') + 1);
        require.cache[file] = module$.exports;
        resolved.call(module$.exports, module$, module$.exports, dirname, file);
        module$.loaded = true;
        return require.cache[file] = module$.exports;
    }
    require.modules = {};
    require.cache = {};
    require.resolve = function (file) {
        return {}.hasOwnProperty.call(require.modules, file) ? require.modules[file] : void 0;
    };
    require.define = function (file, fn) {
        require.modules[file] = fn;
    };
    require.define('/src\\wowboardhelpers.ls', function (module, exports, __dirname, __filename) {
        console.log('Ahhhh\u2026greetings ! Want to help on this ? Head over to http://github.com/Nami-Doc/wowboardhelpers !');
        console.time('wowboardhelpers');
        console.time('WBH: Sugar');
        require('/node_modules\\sugar\\release\\sugar-full.development.js', module);
        Object.extend();
        Date.setLocale(location.href.split('/')[4]);
        console.timeEnd('WBH: Sugar');
        require('/src\\board\\content-class.ls', module);
        require('/src\\board\\css.ls', module);
        require('/src\\jumps\\index.ls', module);
        require('/src\\fix\\index.ls', module);
        if (require('/src\\topic.ls', module)) {
            require('/src\\topic-characters\\index.ls', module);
            require('/src\\topic-posts\\index.ls', module);
            if (require('/src\\textarea.ls', module)) {
                require('/src\\reply\\index.ls', module);
            }
        }
        if (require('/src\\forum.ls', module)) {
            require('/src\\forum-layout\\index.ls', module);
            require('/src\\forum-topics\\index.ls', module);
            require('/src\\forum-layout\\hide-mar.ls', module);
        }
        require('/src\\cheatsheet\\index.ls', module);
        console.timeEnd('wowboardhelpers');
    });
    require.define('/src\\cheatsheet\\index.ls', function (module, exports, __dirname, __filename) {
        var cheatsheet, ref$, $, el, possibleDivs, templateCheatsheet, i$, len$, sel, that, x$, ul;
        cheatsheet = require('/src\\cheatsheet\\bind-key.ls', module).cheatsheet;
        ref$ = require('/node_modules\\dom\\index.ls', module), $ = ref$.$, el = ref$.el;
        if (Object.keys(cheatsheet).length) {
            possibleDivs = [
                '.forum-info',
                '.talkback form'
            ];
            templateCheatsheet = require('/src\\cheatsheet\\templates\\cheatsheet.jadels', module);
            for (i$ = 0, len$ = possibleDivs.length; i$ < len$; ++i$) {
                sel = possibleDivs[i$];
                if (that = $(sel)) {
                    that.appendChild((x$ = el(templateCheatsheet({ cheatsheet: cheatsheet })), ul = x$.querySelector('ul'), ul.style.display = 'none', x$.querySelector('.toggler').onclick = fn$, x$));
                    break;
                }
            }
        }
        function fn$() {
            return ul.style.display = [
                'none',
                ''
            ].exclude(ul.style.display)[0];
        }
    });
    require.define('/src\\cheatsheet\\templates\\cheatsheet.jadels', function (module, exports, __dirname, __filename) {
        var lang, join;
        lang = require('/node_modules\\lang\\index.ls', module);
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            var key, val;
            return '<div id="cheatsheet-container"><!-- that\'s meh but ...--><span class="clear"></span><div id="cheatsheet"><!-- what\'s wrong with you blizz ?--><a class="toggler ui-button button1"><span><span>' + (lang.cheatsheet || '') + '</span></span></a><ul>' + (join(function () {
                var ref$, results$ = [];
                for (key in ref$ = locals.cheatsheet) {
                    val = ref$[key];
                    results$.push('<li><b>' + (key || '') + '</b>: ' + val + '</li>');
                }
                return results$;
            }()) || '') + '</ul></div></div>';
        };
    });
    require.define('/node_modules\\lang\\index.ls', function (module, exports, __dirname, __filename) {
        var l, langs, lang, split$ = ''.split;
        l = split$.call(document.location, '/')[4];
        langs = {
            fr: require('/lib\\lang\\fr.ls', module),
            en: require('/lib\\lang\\en.ls', module)
        };
        module.exports = lang = function () {
            lang.displayName = 'lang';
            var ref$, prototype = lang.prototype, constructor = lang;
            import$(lang, (ref$ = langs[l]) != null ? ref$ : langs.en);
            function lang(it) {
                var ref$;
                return (ref$ = lang[it]) != null ? ref$ : (ref$ = lang[it.camelize(false)]) != null ? ref$ : it;
            }
            lang.pluralize == null && (lang.pluralize = function (count, key) {
                return Math.round(count) + ' ' + lang(key) + [count > 1.5 ? 's' : void 8];
            });
            lang.singularize == null && (lang.singularize = function (it) {
                if (it[it.length - 1] === 's') {
                    return it.slice(0, -1);
                } else {
                    return it;
                }
            });
            lang.simplifyTime = require('/lib\\lang\\simplify-time.ls', module);
            return lang;
        }();
        function import$(obj, src) {
            var own = {}.hasOwnProperty;
            for (var key in src)
                if (own.call(src, key))
                    obj[key] = src[key];
            return obj;
        }
    });
    require.define('/lib\\lang\\simplify-time.ls', function (module, exports, __dirname, __filename) {
        var timeTable;
        timeTable = [
            [
                'heures',
                'h'
            ],
            [
                'heure',
                'h'
            ],
            [
                'houres',
                'h'
            ],
            [
                'hour',
                'h'
            ],
            [
                'minutes',
                'm'
            ],
            [
                'minute',
                'm'
            ],
            [
                'jours',
                'j'
            ],
            [
                'jour',
                'j'
            ],
            [
                'days',
                'd'
            ],
            [
                'day',
                'd'
            ],
            [
                'secondes',
                's'
            ],
            [
                'seconds',
                's'
            ],
            [
                'second',
                's'
            ]
        ];
        module.exports = function () {
            function simplifyTime(it) {
                var i$, ref$, len$, ref1$, convertFrom, convertTo;
                for (i$ = 0, len$ = (ref$ = timeTable).length; i$ < len$; ++i$) {
                    ref1$ = ref$[i$], convertFrom = ref1$[0], convertTo = ref1$[1];
                    it = it.replace(convertFrom, convertTo);
                }
                return it;
            }
            return simplifyTime;
        }();
    });
    require.define('/lib\\lang\\en.ls', function (module, exports, __dirname, __filename) {
        module.exports = {
            timeIndex: 0,
            timeOutdex: -1,
            lastMessage: 'Last',
            toggleSticky: 'Show/Hide stickies',
            mar: 'Mark all as read',
            fewSecondsAgo: 'few seconds ago',
            newMessages: 'There are new message(s)',
            checkingNew: 'Checking new messages ...',
            noNew: 'No new message.',
            otherCharacters: 'Other characters',
            cheatsheet: 'Cheatsheet',
            jumpToLastRead: 'Jump to last read message',
            quickQuote: 'Quote the selected part',
            pageTop: 'Go to top',
            pageBottom: 'Go to bottom',
            login: 'Login',
            newTopic: 'New topic'
        };
    });
    require.define('/lib\\lang\\fr.ls', function (module, exports, __dirname, __filename) {
        module.exports = {
            timeIndex: 3,
            timeOutdex: 0,
            toggleSticky: 'Afficher/Cacher les post-its',
            mar: 'Tout marquer comme lu',
            newMessages: 'Il y a des nouveau(x) message(s)',
            checkingNew: 'V\xe9rification des nouveaux messages ...',
            noNew: 'Pas de nouveau message.',
            fewSecondsAgo: 'il y a quelques secondes',
            seconde: 'second',
            second: 'seconde',
            heure: 'hour',
            hour: 'heure',
            jour: 'day',
            day: 'jour',
            few: 'quelques',
            lastMessage: 'Message',
            htmlOverrides: {
                '.replies': 'REPS',
                '.poster': 'Dernier'
            },
            otherCharacters: 'Autres personnages',
            cheatsheet: 'Raccourcis',
            jumpToLastRead: 'Aller au dernier message lu',
            quickQuote: 'Citer le bout de message s\xe9lectionn\xe9',
            pageTop: 'Haut de page',
            pageBottom: 'Bas de page',
            login: 'Connexion',
            newTopic: 'Nouveau sujet'
        };
    });
    require.define('/node_modules\\dom\\index.ls', function (module, exports, __dirname, __filename) {
        module.exports = {
            $: require('/lib\\dom\\$.ls', module),
            $$: require('/lib\\dom\\$$.ls', module),
            el: require('/lib\\dom\\el.ls', module),
            node: require('/lib\\dom\\node.ls', module)
        };
    });
    require.define('/lib\\dom\\node.ls', function (module, exports, __dirname, __filename) {
        module.exports = function () {
            function node(tag, props) {
                props == null && (props = {});
                return import$(document.createElement(tag), props);
            }
            return node;
        }();
        function import$(obj, src) {
            var own = {}.hasOwnProperty;
            for (var key in src)
                if (own.call(src, key))
                    obj[key] = src[key];
            return obj;
        }
    });
    require.define('/lib\\dom\\el.ls', function (module, exports, __dirname, __filename) {
        module.exports = function (it) {
            var x$;
            x$ = document.createElement('div');
            x$.innerHTML = it;
            return x$.firstElementChild;
            return x$;
        };
    });
    require.define('/lib\\dom\\$$.ls', function (module, exports, __dirname, __filename) {
        module.exports = function (it, ctx) {
            ctx == null && (ctx = document);
            return ctx.querySelectorAll(it);
        };
    });
    require.define('/lib\\dom\\$.ls', function (module, exports, __dirname, __filename) {
        module.exports = function (it, ctx) {
            ctx == null && (ctx = document);
            return ctx.querySelector(it);
        };
    });
    require.define('/src\\cheatsheet\\bind-key.ls', function (module, exports, __dirname, __filename) {
        var lang, $, html, bindKey, cheatsheet, join$ = [].join;
        lang = require('/node_modules\\lang\\index.ls', module);
        $ = require('/node_modules\\dom\\index.ls', module).$;
        html = $('html');
        module.exports = bindKey = function (binds, langKey, cb) {
            var codes;
            cheatsheet[join$.call(binds.toUpperCase().chars(), ', ')] = lang(langKey);
            codes = binds.toUpperCase().codes().map(function (it) {
                return 0 + it;
            });
            document.addEventListener('keydown', function (it) {
                if (!in$(it.keyCode, codes)) {
                    return;
                }
                if (it.target !== html) {
                    return;
                }
                it.preventDefault();
                cb();
            });
        };
        bindKey.cheatsheet = cheatsheet = {};
        function in$(x, arr) {
            var i = -1, l = arr.length >>> 0;
            while (++i < l)
                if (x === arr[i] && i in arr)
                    return true;
            return false;
        }
    });
    require.define('/src\\forum-layout\\hide-mar.ls', function (module, exports, __dirname, __filename) {
        var $;
        $ = require('/node_modules\\dom\\index.ls', module).$;
        if (!$('.regular > .unread:not(.hidden)')) {
            require('/src\\forum-options.ls', module).removeChild(require('/src\\forum-layout\\mar.ls', module));
        }
    });
    require.define('/src\\forum-layout\\mar.ls', function (module, exports, __dirname, __filename) {
        var lang, fetchSiblings, forumOptions, tbodyRegular, w, node, allRead, buttonMar, x$, split$ = ''.split;
        lang = require('/node_modules\\lang\\index.ls', module);
        fetchSiblings = require('/node_modules\\fetch-siblings\\index.ls', module);
        forumOptions = require('/src\\forum-options.ls', module);
        tbodyRegular = require('/src\\tbody-regular.ls', module);
        w = require('/src\\w.ls', module);
        node = require('/node_modules\\dom\\index.ls', module).node;
        allRead = false;
        module.exports = buttonMar = node('a', {
            innerHTML: 'MAR',
            title: lang.mar,
            onclick: function () {
                var i$, ref$, len$, row, topicId, siblings, x$;
                if (allRead) {
                    return;
                }
                allRead = !allRead;
                for (i$ = 0, len$ = (ref$ = tbodyRegular.children).length; i$ < len$; ++i$) {
                    row = ref$[i$];
                    if (row.classList.contains('read')) {
                        continue;
                    }
                    topicId = row.id.slice('postRow'.length);
                    siblings = fetchSiblings(row.children[0], { slice: 5 });
                    x$ = bind$(localStorage, 'setItem');
                    x$('topic_' + topicId, split$.call(siblings.lastPost.children[0].href, '#')[1]);
                    x$('topic_lp_' + topicId, siblings.author.innerHTML.trim());
                    row.classList.add('read');
                }
                forumOptions.removeChild(buttonMar);
            }
        });
        x$ = buttonMar;
        x$.style.cursor = 'pointer';
        forumOptions.appendChild(x$);
        function bind$(obj, key, target) {
            return function () {
                return (target || obj)[key].apply(obj, arguments);
            };
        }
    });
    require.define('/src\\w.ls', function (module, exports, __dirname, __filename) {
        var w;
        w = typeof unsafeWindow != 'undefined' && unsafeWindow !== null ? unsafeWindow : window;
        if (!w.Cms) {
            w = w.window = function () {
                var el;
                el = document.createElement('p');
                el.setAttribute('onclick', 'return window;');
                return el.onclick();
            }.call(this);
        }
        module.exports = w;
    });
    require.define('/src\\tbody-regular.ls', function (module, exports, __dirname, __filename) {
        var $;
        $ = require('/node_modules\\dom\\index.ls', module).$;
        module.exports = $('tbody.regular');
    });
    require.define('/src\\forum-options.ls', function (module, exports, __dirname, __filename) {
        var $;
        $ = require('/node_modules\\dom\\index.ls', module).$;
        module.exports = $('.forum-options');
    });
    require.define('/node_modules\\fetch-siblings\\index.ls', function (module, exports, __dirname, __filename) {
        module.exports = function () {
            function fetchSiblings(elem, arg$) {
                var slice, ref$, indexBy, results$ = {};
                slice = (ref$ = arg$.slice) != null ? ref$ : 0, indexBy = (ref$ = arg$.indexBy) != null ? ref$ : 'className';
                while (elem != null && (elem = elem.nextElementSibling)) {
                    results$[elem[indexBy].slice(slice)] = elem;
                }
                return results$;
            }
            return fetchSiblings;
        }();
    });
    require.define('/src\\forum-topics\\index.ls', function (module, exports, __dirname, __filename) {
        var lastUpdated, moveRedirects, hideTopic, times;
        lastUpdated = require('/src\\forum-topics\\last-updated.ls', module);
        moveRedirects = require('/src\\forum-topics\\move-redirects.ls', module);
        hideTopic = require('/src\\forum-topics\\hide-topic.ls', module);
        times = require('/src\\forum-topics\\times.ls', module);
    });
    require.define('/src\\forum-topics\\times.ls', function (module, exports, __dirname, __filename) {
        var lang, parseTime, $$, current, postTitles, dates, i$, len$, postTitle, postTimestamp, date, timestamp, timeout, refresh;
        lang = require('/node_modules\\lang\\index.ls', module);
        parseTime = require('/node_modules\\parse-time\\index.ls', module);
        $$ = require('/node_modules\\dom\\index.ls', module).$$;
        current = Date.now();
        postTitles = $$('.post-title[data-date-string]');
        dates = [];
        for (i$ = 0, len$ = postTitles.length; i$ < len$; ++i$) {
            postTitle = postTitles[i$];
            postTimestamp = parseTime(postTitle.dataset.dateString);
            date = Date.create(current - postTimestamp);
            timestamp = date.getTime();
            dates[timestamp] = date;
            postTitle.dataset.timestamp = timestamp;
        }
        timeout = 10..seconds();
        refresh = function () {
            var i$, ref$, len$, postTitle, date;
            for (i$ = 0, len$ = (ref$ = postTitles).length; i$ < len$; ++i$) {
                postTitle = ref$[i$];
                date = dates[postTitle.dataset.timestamp];
                postTitle.querySelector('.relative-date').innerHTML = date.relative();
            }
            return setTimeout(refresh, timeout);
        };
        refresh();
    });
    require.define('/node_modules\\parse-time\\index.ls', function (module, exports, __dirname, __filename) {
        var lang, units, res$, i$, ref$, len$, name, split$ = ''.split;
        lang = require('/node_modules\\lang\\index.ls', module);
        res$ = {};
        for (i$ = 0, len$ = (ref$ = [
                'second',
                'minute',
                'hour',
                'day'
            ]).length; i$ < len$; ++i$) {
            name = ref$[i$];
            res$[name] = 1[name]();
        }
        units = res$;
        module.exports = function (it) {
            var total, i$, ref$, len$, timespan, ref1$, count, unit;
            total = 0;
            for (i$ = 0, len$ = (ref$ = split$.call(it, ', ')).length; i$ < len$; ++i$) {
                timespan = ref$[i$];
                ref1$ = split$.call(timespan, ' '), count = ref1$[0], unit = ref1$[1];
                count = +count;
                if (count === lang('few')) {
                    count = 5;
                    unit = lang('second');
                }
                total += count * units[lang(lang.singularize(unit))];
            }
            return total;
        };
    });
    require.define('/src\\forum-topics\\hide-topic.ls', function (module, exports, __dirname, __filename) {
        var tbodyRegular, ref$, $, $$, el, templateHideTopic, hiddenTopics, i$, len$, postPages, that, tr, topicId, split$ = ''.split, join$ = [].join;
        tbodyRegular = require('/src\\tbody-regular.ls', module);
        ref$ = require('/node_modules\\dom\\index.ls', module), $ = ref$.$, $$ = ref$.$$, el = ref$.el;
        templateHideTopic = require('/src\\forum-topics\\templates\\hide-topic.jadels', module);
        hiddenTopics = split$.call(localStorage.getItem('hidden_topics') || '', ';');
        function saveHiddens() {
            localStorage.setItem('hidden_topics', join$.call(hiddenTopics, ';'));
        }
        function hide(it) {
            var that;
            it.parentNode.removeChild(it);
            tbodyRegular.appendChild(it);
            it.className += ' hidden';
            if (that = it.querySelector('.last-read')) {
                that.parentNode.removeChild(that);
            }
        }
        for (i$ = 0, len$ = (ref$ = $$('tbody.regular .post-pages')).length; i$ < len$; ++i$) {
            postPages = ref$[i$];
            if (that = postPages.querySelector('.last-read')) {
                postPages.removeChild(that);
            }
            tr = postPages.parentNode;
            topicId = tr.id.slice('postRow'.length);
            if (in$(topicId, hiddenTopics)) {
                hide(tr);
            }
            fn$.call(this, tr, topicId, postPages);
        }
        if ($('tbody.regular tr:not(.hidden):not(.read)')) {
            clearTimeout(require('/src\\forum-layout\\check-updates.ls', module));
        }
        function in$(x, arr) {
            var i = -1, l = arr.length >>> 0;
            while (++i < l)
                if (x === arr[i] && i in arr)
                    return true;
            return false;
        }
        function fn$(tr, topicId, postPages) {
            var x$;
            x$ = el(templateHideTopic({ hidden: in$(topicId, hiddenTopics) }));
            x$.onclick = function () {
                if (in$(topicId, hiddenTopics)) {
                    postPages.removeChild(x$);
                    hiddenTopics.splice(hiddenTopics.indexOf(topicId), 1);
                } else {
                    hide(tr);
                    hiddenTopics.push(topicId);
                }
                return saveHiddens();
            };
            postPages.insertBefore(x$, postPages.children[0]);
        }
    });
    require.define('/src\\forum-layout\\check-updates.ls', function (module, exports, __dirname, __filename) {
        var lang, tbodyRegular, ajax, ref$, $, node, firstTopicId, trHtml, aEndHtml, tbodyHtml, x$, h1, refresh, timeout;
        lang = require('/node_modules\\lang\\index.ls', module);
        tbodyRegular = require('/src\\tbody-regular.ls', module);
        ajax = require('/node_modules\\ajax\\index.ls', module);
        ref$ = require('/node_modules\\dom\\index.ls', module), $ = ref$.$, node = ref$.node;
        firstTopicId = tbodyRegular.children[0].id.slice('postRow'.length);
        trHtml = '<tr id="postRow' + firstTopicId;
        aEndHtml = 'data-tooltip-options=\'{"location": "mouse"}\'>';
        tbodyHtml = '<tbody class="regular">';
        x$ = $('#forum-actions-top');
        x$.insertBefore(h1 = node('h1'), (ref$ = x$.children)[ref$.length - 1]);
        refresh = function () {
            return ajax.get(document.location, function () {
                var afterRegular, startPos, title;
                if (this.status !== 200) {
                    console.log('encountered status ' + this.status + ' while checking for updates; forum might be unstable');
                    return;
                }
                h1.innerHTML = lang.checkingNew;
                afterRegular = this.response.slice(tbodyHtml.length + this.response.indexOf(tbodyHtml)).trim();
                if (afterRegular.startsWith(trHtml)) {
                    h1.innerHTML += ' <u>' + lang.noNew + '</u>';
                    setTimeout(function () {
                        return h1.innerHTML = '';
                    }, 1500);
                    setTimeout(refresh, timeout);
                } else {
                    startPos = aEndHtml.length + afterRegular.indexOf(aEndHtml);
                    afterRegular = afterRegular.slice(startPos);
                    title = afterRegular.to(afterRegular.indexOf('<')).trim();
                    h1.innerHTML = '<a href=\'' + document.location + '\'>' + lang.newMessages + '</a> : ' + [title.length > 30 ? '<br />' : void 8] + title;
                }
            });
        };
        timeout = 15..seconds();
        module.exports = setTimeout(refresh, timeout);
    });
    require.define('/node_modules\\ajax\\index.ls', function (module, exports, __dirname, __filename) {
        module.exports = {
            get: function (url, success) {
                var x$;
                x$ = new XMLHttpRequest();
                x$.open('GET', url);
                x$.onload = success;
                x$.send();
                return x$;
            }
        };
    });
    require.define('/src\\forum-topics\\templates\\hide-topic.jadels', function (module, exports, __dirname, __filename) {
        var join;
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            return '' + ((locals.hidden ? '<a class="last-read show-topic">\u2713</a>' : '<a class="last-read hide-topic">X</a>') || '');
        };
    });
    require.define('/src\\forum-topics\\move-redirects.ls', function (module, exports, __dirname, __filename) {
        var tbodyRegular, i$, ref$, len$, status, tr;
        tbodyRegular = require('/src\\tbody-regular.ls', module);
        for (i$ = 0, len$ = (ref$ = tbodyRegular.querySelectorAll('.post-status')).length; i$ < len$; ++i$) {
            status = ref$[i$];
            tr = status.parentNode.parentNode;
            tr.className += ' hidden redirect';
            tbodyRegular.removeChild(tr);
            tbodyRegular.appendChild(tr);
        }
    });
    require.define('/src\\forum-topics\\last-updated.ls', function (module, exports, __dirname, __filename) {
        var fetchSiblings, characters, lang, simplifyTime, ref$, $, $$, el, node, templateAuthor, templateTtLastUpdated, templateDefaultPagination, lastPostTh, TSTATE_UNK, TSTATE_ALR, TSTATE_CHK, hasUnread, i$, len$, post, children, div, a, td, lastPostTd, topicId, ref1$, pages, lastPost, lastPostLink, replies, author, postCount, postOnly, text, isCm, that, authorName, inlineText, simplifiedTime, state, out$ = typeof exports != 'undefined' && exports || this, split$ = ''.split, join$ = [].join, slice$ = [].slice;
        fetchSiblings = require('/node_modules\\fetch-siblings\\index.ls', module);
        characters = require('/src\\characters.ls', module);
        lang = require('/node_modules\\lang\\index.ls', module), simplifyTime = lang.simplifyTime;
        ref$ = require('/node_modules\\dom\\index.ls', module), $ = ref$.$, $$ = ref$.$$, el = ref$.el, node = ref$.node;
        templateAuthor = require('/src\\forum-topics\\templates\\author.jadels', module);
        templateTtLastUpdated = require('/src\\forum-topics\\templates\\tt-last-updated.jadels', module);
        templateDefaultPagination = require('/src\\forum-topics\\templates\\default-pagination.jadels', module);
        out$.lastPostTh = lastPostTh = node('td', {
            className: 'last-post-th',
            innerHTML: lang.lastMessage
        });
        $('.post-th').appendChild(lastPostTh);
        TSTATE_UNK = 0;
        TSTATE_ALR = 1;
        TSTATE_CHK = 2;
        hasUnread = false;
        for (i$ = 0, len$ = (ref$ = document.getElementsByClassName('post-title')).length; i$ < len$; ++i$) {
            post = ref$[i$], children = post.children, div = children[0], a = children[1], td = post.parentNode;
            if (children.length > 2) {
                lastPostTd = node('td', {
                    className: 'post-last-updated',
                    innerHTML: ' '
                });
                td.appendChild(lastPostTd);
                continue;
            }
            topicId = div.id.slice('thread_tt_'.length);
            ref1$ = fetchSiblings(post, { slice: 5 }), pages = ref1$.pages, lastPost = ref1$.lastPost, lastPostLink = lastPost.children[0], replies = ref1$.replies, author = ref1$.author;
            postCount = split$.call(lastPostLink.href, '#')[1];
            if (!pages.querySelector('ul')) {
                pages.innerHTML = templateDefaultPagination({ href: a.href });
            }
            postOnly = false;
            text = split$.call(div.querySelector('.tt_info').innerHTML, '\n');
            text = text[2].trim().length ? text[2] : (postOnly = true, div.querySelector('.tt_time').innerHTML);
            isCm = false;
            if (that = lastPostLink.querySelector('span')) {
                lastPostLink = that;
                isCm = true;
            }
            text = text.replace(RegExp('(' + (authorName = lastPostLink.innerHTML.trim()) + ')'), fn$);
            inlineText = text;
            if (!postOnly) {
                inlineText = inlineText.slice(text.indexOf('(') + 1, -1);
            }
            simplifiedTime = inlineText.has('/') ? inlineText : (simplifiedTime = join$.call(slice$.call(split$.call(inlineText, ' '), lang.timeIndex, lang.timeOutdex - 1 + 1 || 9000000000), ' '), text = text.replace(inlineText, '<span class=\'relative-date\'>' + inlineText + '</span>'), post.dataset.dateString = simplifiedTime, simplifyTime(simplifiedTime));
            post.appendChild(el(templateTtLastUpdated({ text: text })));
            td.appendChild(node('td', {
                className: 'post-last-updated',
                innerHTML: simplifiedTime
            }));
            state = checkTopic(topicId, postCount, authorName);
            if (state !== TSTATE_CHK) {
                if (that = characters && authorName) {
                    if (in$(that, characters)) {
                        state = TSTATE_CHK;
                    }
                }
                if (replies == 0 && in$(authorName.trim(), characters)) {
                    state = TSTATE_CHK;
                }
            }
            if (state === TSTATE_CHK) {
                td.className = 'read';
                if (that = pages.querySelector('.last-read')) {
                    pages.removeChild(that);
                }
            } else {
                hasUnread = true;
                td.className = 'unread';
            }
            if (state !== TSTATE_UNK) {
                a.href = (ref1$ = pages.getElementsByTagName('a'))[ref1$.length - 1].href;
            }
            markState(post, state);
        }
        function markState(node, state) {
            var innerHTML, states;
            innerHTML = node.innerHTML;
            states = [
                '?',
                '!',
                '\u2713'
            ];
            node.innerHTML = '<b>[' + states[state] + ']</b> ' + innerHTML;
        }
        function checkTopic(id, count, lastPoster) {
            var ref$;
            switch (ref$ = [localStorage.getItem('topic_' + id)], false) {
            case !function (it) {
                    return it > count;
                }(ref$[0]):
                if (lastPoster === getLastPoster(id)) {
                    return TSTATE_CHK;
                } else {
                    return TSTATE_ALR;
                }
                break;
            case !function (it) {
                    return it === count;
                }(ref$[0]):
                return TSTATE_CHK;
            case !(0 === ref$[0] || null === ref$[0]):
                return TSTATE_UNK;
            default:
                return TSTATE_ALR;
            }
        }
        function getLastPoster(it) {
            return localStorage.getItem('topic_lp_' + it);
        }
        function in$(x, arr) {
            var i = -1, l = arr.length >>> 0;
            while (++i < l)
                if (x === arr[i] && i in arr)
                    return true;
            return false;
        }
        function fn$(it) {
            return templateAuthor({
                name: it,
                own: in$(it, characters),
                cm: isCm
            });
        }
    });
    require.define('/src\\forum-topics\\templates\\default-pagination.jadels', function (module, exports, __dirname, __filename) {
        var join;
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            return '<ul class="ui-pagination"><li><a data-pagenum=\'1\' rel="np" href="' + locals.href + '">1</a></li></ul>';
        };
    });
    require.define('/src\\forum-topics\\templates\\tt-last-updated.jadels', function (module, exports, __dirname, __filename) {
        var join;
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            return '<div class="tt-last-updated"><br/>' + (locals.text || '') + '</div>';
        };
    });
    require.define('/src\\forum-topics\\templates\\author.jadels', function (module, exports, __dirname, __filename) {
        var join;
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            return '    <span class="' + [
                'poster',
                locals.own ? 'own-poster' : void 8,
                locals.cm ? 'type-blizzard' : void 8
            ].join(' ') + '">' + ((locals.cm ? '<img src="/wow/static/images/layout/cms/icon_blizzard.gif" alt="CM"/>' : void 8) || '') + '\n' + (locals.name || '') + '</span>';
        };
    });
    require.define('/src\\characters.ls', function (module, exports, __dirname, __filename) {
        var $$, characters, slice$ = [].slice;
        $$ = require('/node_modules\\dom\\index.ls', module).$$;
        characters = slice$.call($$('.char-wrapper .name'));
        if (characters.length) {
            characters = characters.map('innerHTML');
        }
        module.exports = characters;
    });
    require.define('/src\\forum-layout\\index.ls', function (module, exports, __dirname, __filename) {
        var jumps, checkUpdates, mar, moveActions, stickies;
        jumps = require('/src\\forum-layout\\jumps\\index.ls', module);
        checkUpdates = require('/src\\forum-layout\\check-updates.ls', module);
        mar = require('/src\\forum-layout\\mar.ls', module);
        moveActions = require('/src\\forum-layout\\move-actions.ls', module);
        stickies = require('/src\\forum-layout\\stickies.ls', module);
    });
    require.define('/src\\forum-layout\\stickies.ls', function (module, exports, __dirname, __filename) {
        var lang, forumOptions, w, ref$, $, node, sticky, buttonSticky, x$;
        lang = require('/node_modules\\lang\\index.ls', module);
        forumOptions = require('/src\\forum-options.ls', module);
        w = require('/src\\w.ls', module);
        ref$ = require('/node_modules\\dom\\index.ls', module), $ = ref$.$, node = ref$.node;
        sticky = $('.sticky');
        if ('show' !== w.localStorage.getItem('show-stickies')) {
            sticky.style.display = 'none';
        }
        module.exports = buttonSticky = node('a', {
            innerHTML: 'Post-its',
            title: lang.toggleSticky,
            onclick: function () {
                sticky.style.display = [
                    'none',
                    ''
                ].exclude(sticky.style.display)[0];
                w.localStorage.setItem('show-stickies', s.display || 'show');
            }
        });
        x$ = buttonSticky;
        x$.style.cursor = 'pointer';
        forumOptions.appendChild(x$);
    });
    require.define('/src\\forum-layout\\move-actions.ls', function (module, exports, __dirname, __filename) {
        var $, x$;
        $ = require('/node_modules\\dom\\index.ls', module).$;
        x$ = $('.forum-options');
        x$.parentNode.removeChild(x$);
        $('.content-trail').appendChild(x$);
    });
    require.define('/src\\forum-layout\\jumps\\index.ls', function (module, exports, __dirname, __filename) {
        var newTopic;
        newTopic = require('/src\\forum-layout\\jumps\\new-topic.ls', module);
    });
    require.define('/src\\forum-layout\\jumps\\new-topic.ls', function (module, exports, __dirname, __filename) {
        var bindKey, w, $;
        bindKey = require('/src\\cheatsheet\\bind-key.ls', module);
        w = require('/src\\w.ls', module);
        $ = require('/node_modules\\dom\\index.ls', module).$;
        if (!$('a.button1.disabled')) {
            bindKey('n', 'new-topic', function () {
                document.location += 'topic';
            });
        }
    });
    require.define('/src\\forum.ls', function (module, exports, __dirname, __filename) {
        var that, ref$, split$ = ''.split;
        module.exports = (that = document.getElementById('posts')) ? (that.dataset.id = split$.call((ref$ = split$.call(document.location, '/'))[ref$.length - 2], '?')[0], that) : null;
    });
    require.define('/src\\reply\\index.ls', function (module, exports, __dirname, __filename) {
        var clearTextarea, memebox, preview, quickQuote, rememberReply;
        clearTextarea = require('/src\\reply\\clear-textarea.ls', module);
        memebox = require('/src\\reply\\memebox.ls', module);
        preview = require('/src\\reply\\preview.ls', module);
        quickQuote = require('/src\\reply\\quick-quote.ls', module);
        rememberReply = require('/src\\reply\\remember-reply.ls', module);
    });
    require.define('/src\\reply\\remember-reply.ls', function (module, exports, __dirname, __filename) {
        var textarea, topic, $, submit;
        textarea = require('/src\\textarea.ls', module);
        topic = require('/src\\topic.ls', module);
        $ = require('/node_modules\\dom\\index.ls', module).$;
        submit = $('.post [type=submit]');
        if (!textarea.value) {
            textarea.value = localStorage.getItem('post_' + topic.dataset.id) || '';
        }
        textarea.onkeyup = function () {
            return localStorage.setItem('post_' + topic.dataset.id, this.value);
        };
        submit.onclick = function () {
            return localStorage.setItem('post_' + topic.dataset.id, '');
        };
    });
    require.define('/src\\topic.ls', function (module, exports, __dirname, __filename) {
        var that, x$, ref$, i$, replace$ = ''.replace, split$ = ''.split;
        module.exports = (that = document.getElementById('thread')) ? (x$ = that.dataset, x$.url = replace$.call(split$.call(document.location, '?')[0], /#[0-9]+/, ''), x$.page = ((ref$ = /\?page=([0-9]+)/.exec(document.location)) != null ? ref$[1] : void 8) || 1, ref$ = split$.call(x$.url, '/'), i$ = ref$.length - 2, x$.topicId = ref$[i$], x$.id = ref$[i$ + 1], ref$, that) : null;
    });
    require.define('/src\\textarea.ls', function (module, exports, __dirname, __filename) {
        var topic, $;
        topic = require('/src\\topic.ls', module);
        $ = require('/node_modules\\dom\\index.ls', module).$;
        module.exports = topic ? $('#post-edit textarea') : null;
    });
    require.define('/src\\reply\\quick-quote.ls', function (module, exports, __dirname, __filename) {
        var bindKey, textarea, w, $;
        bindKey = require('/src\\cheatsheet\\bind-key.ls', module);
        textarea = require('/src\\textarea.ls', module);
        w = require('/src\\w.ls', module);
        $ = require('/node_modules\\dom\\index.ls', module).$;
        bindKey('r', 'quick-quote', function () {
            var that, x$;
            if (that = w.getSelection().toString()) {
                x$ = textarea;
                x$.value += (x$.value ? '\n' : '') + ('[quote]' + that + '[/quote]');
                x$.selectionStart = x$.selectionEnd = x$.value.length;
                x$.focus();
            }
            $('#forum-actions-bottom').scrollIntoView();
        });
    });
    require.define('/src\\reply\\preview.ls', function (module, exports, __dirname, __filename) {
        var w, autolink, $, postPreview, old;
        w = require('/src\\w.ls', module);
        autolink = require('/node_modules\\autolink\\index.ls', module);
        $ = require('/node_modules\\dom\\index.ls', module).$;
        postPreview = $('#post-preview');
        old = bind$(w.BML, 'preview');
        w.BML.preview = function (content, target, callback) {
            old(content, target, function () {
                callback();
                autolink(postPreview);
            });
        };
        function bind$(obj, key, target) {
            return function () {
                return (target || obj)[key].apply(obj, arguments);
            };
        }
    });
    require.define('/node_modules\\autolink\\index.ls', function (module, exports, __dirname, __filename) {
        var extensions, rules, ajax, replace$ = ''.replace;
        extensions = '(?:com|net|org|eu|fr|jp|us|co.uk|me)';
        rules = [
            [
                /(?:https?:\/\/)?(?:(?:www|m)\.)?(youtu\.be\/([\w\-_]+)(\?[&=\w\-_;\#]*)?|youtube\.com\/watch\?([&=\w\-_;\.\?\#\%]*)v=([\w\-_]+)([&=\w\-\._;\?\#\%]*))/g,
                '<iframe class="youtube-player" type="text/html" width="640" height="385" src="http://www.youtube.com/embed/$2$5#$3$4$6" frameborder="0"></iframe>'
            ],
            [
                /\((https?:\/\/)([^<\s\)]+)\)/g,
                '(<a class="external" rel="noreferrer" href="$1$2" title="$1$2" data-autolink="paren-specialcase" target="_blank">$2</a>)'
            ],
            [
                RegExp('(^|>|;|\\s)(?:https?:\\/\\/)?([\\w\\.\\-]+\\.' + extensions + '(/[^<\\s]*)?(?=[\\s<]|$))', 'g'),
                '$1<a class="external" rel="noreferrer" href="http://$2" data-autolink="protocol-specialcase" title="$2" target="_blank">$2</a>'
            ],
            [
                /([^"'\/]|^)(https?:\/\/)(?![a-z]{2}\.battle\.net)([^<\s\)]+)/g,
                '$1<a class="external" rel="noreferrer" href="$2$3" title="$2$3" data-autolink="quote-specialcase" target="_blank">$3</a>'
            ],
            [
                RegExp('(^|>|;|\\s)((?!(?:www\\.)?dropbox)[\\w\\.\\-]+\\.' + extensions + '(/[^.<\\s]*)\\.(jpg|png|gif|jpeg)(?=[\\s<]|$)|puu\\.sh/[a-zA-Z0-9]+)', 'g'),
                '$1<img src="http://$2" alt="$2" class="autolink" />'
            ]
        ];
        module.exports = elAutolink;
        ajax = require('/node_modules\\ajax\\index.ls', module);
        function elAutolink(el) {
            var h, r, ref$, url, e;
            try {
                h = autolink(el.innerHTML);
                r = /\>((?:http:\/\/)?[a-z]{2}\.battle\.net\/[^<\s.]*)/g;
                while ((ref$ = r.exec(h)) != null && (url = ref$[1], ref$)) {
                    fn$.call(this, url);
                }
                return el.innerHTML = h;
            } catch (e$) {
                e = e$;
                return console.log('Unable to generate valid HTML : ' + h + ' (' + e + ')');
            }
            function fn$(url) {
                var fullUrl;
                fullUrl = url.has('http://') ? url : 'http://' + url;
                ajax.get(fullUrl, function () {
                    var that;
                    if (that = /<title>(.+)<\/title>/.exec(this.response)) {
                        el.innerHTML = el.innerHTML.replace('>' + url, '>' + replace$.call(that[1], ' - World of Warcraft', ''));
                    }
                });
            }
        }
        function autolink(it) {
            var i$, ref$, len$, ref1$, pattern, replacement;
            for (i$ = 0, len$ = (ref$ = rules).length; i$ < len$; ++i$) {
                ref1$ = ref$[i$], pattern = ref1$[0], replacement = ref1$[1];
                it = it.replace(pattern, replacement);
            }
            return it;
        }
    });
    require.define('/src\\reply\\memebox.ls', function (module, exports, __dirname, __filename) {
        var memes, textarea, ref$, $, el, templateMemebox, that, addMeme, appendMeme, memebox, ul, replace$ = ''.replace;
        memes = {
            challengeaccepted: 'http://sambacentral.files.wordpress.com/2012/11/challenge-accepted.jpg',
            foreveralone: 'http://i1.kym-cdn.com/entries/icons/original/000/003/619/Untitled-1.jpg',
            bitchplease: 'http://www.troll.me/images/yao-ming/bitch-please.jpg',
            stfuandgtfo: 'http://4.bp.blogspot.com/-cD0QmZLGuAY/TnHyAD269EI/AAAAAAAAAkU/6O4rA1REcdI/s1600/STFU_and_GTFO.jpg',
            youdontsay: 'http://bearsharkaxe.com/wp-content/uploads/2012/06/you-dont-say.jpg',
            fullretard: 'http://www.osborneink.com/wp-content/uploads/2012/11/never_go_full_retard1.jpg',
            susalenemi: 'http://img11.hostingpics.net/pics/311549libertlolxqt.png',
            fulloffuck: 'http://www.mememaker.net/static/images/templates/14288.jpg',
            seriously: 'http://i3.kym-cdn.com/entries/icons/original/000/005/545/OpoQQ.jpg',
            trollface: 'http://fc09.deviantart.net/fs70/f/2012/342/5/a/troll_face_by_bmsproductionz-d5ng9k6.png',
            escalated: 'http://cdn.memegenerator.net/instances/250x250/30199807.jpg',
            fuckyeah: 'http://cdn.ebaumsworld.com/mediaFiles/picture/2168064/82942867.jpg',
            pedobear: 'http://aserres.free.fr/pedobear/pedobear.png',
            slowpoke: 'https://0-media-cdn.foolz.us/ffuuka/board/a/image/1351/43/1351437155488.png',
            megusta: 'http://a400.idata.over-blog.com/5/08/51/37/me_gusta_by_projectendo-d2z3rku.jpg',
            notbad: 'http://www.reactionface.info/sites/default/files/images/YvEN9.png',
            ohcrap: 'http://i1.kym-cdn.com/entries/icons/original/000/004/077/Raisins_Face.jpg',
            trauma: 'http://global3.memecdn.com/trauma_c_629591.jpg',
            yuno: 'http://i1.kym-cdn.com/entries/icons/original/000/004/006/y-u-no-guy.jpg',
            okay: 'http://cache.ohinternet.com/images/e/e6/Okay_guy.jpg',
            no: 'http://stickerish.com/wp-content/uploads/2011/09/NoGuyBlackSS.png'
        };
        textarea = require('/src\\textarea.ls', module);
        ref$ = require('/node_modules\\dom\\index.ls', module), $ = ref$.$, el = ref$.el;
        templateMemebox = require('/src\\reply\\templates\\memebox.jadels', module);
        if (that = $('.post.general')) {
            that.removeChild((ref$ = that.children)[ref$.length - 1]);
            addMeme = function (url) {
                return function () {
                    return textarea.value += [textarea.value ? '\n' : void 8] + url;
                };
            };
            appendMeme = function (name, url) {
                var x$;
                return ul.appendChild((x$ = document.createElement('li'), x$.innerHTML = name, x$.onclick = addMeme(url), x$));
            };
            memebox = el(templateMemebox());
            ul = memebox.querySelector('#memes');
            memebox.querySelector('#meme-search').onkeyup = function () {
                var value, approximates, i, name, ref$, url, i$, len$;
                value = replace$.call(this.value, /[\s_-]+/, '');
                ul.innerHTML = '';
                if (!value) {
                    return;
                }
                approximates = [];
                i = 0;
                for (name in ref$ = memes) {
                    url = ref$[name];
                    switch (name.indexOf(value)) {
                    case -1:
                    case 0:
                        appendMeme(name, url);
                        if (++i > 10) {
                            break;
                        }
                        break;
                    default:
                        approximates.push([
                            name,
                            url
                        ]);
                    }
                }
                for (i$ = 0, len$ = approximates.length; i$ < len$; ++i$) {
                    ref$ = approximates[i$], name = ref$[0], url = ref$[1];
                    appendMeme(name, url);
                    if (++i > 10) {
                        break;
                    }
                }
            };
            that.appendChild(memebox);
        }
    });
    require.define('/src\\reply\\templates\\memebox.jadels', function (module, exports, __dirname, __filename) {
        var join;
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            return '<div id="memebox"><h1>MemeBox</h1><br/><input id="meme-search" placeholder="meme" autocomplete="off" size="15"/><ul id="memes"></ul></div>';
        };
    });
    require.define('/src\\reply\\clear-textarea.ls', function (module, exports, __dirname, __filename) {
        var textarea, topic, ref$, $, el, templateClearTextarea, clearer, that;
        textarea = require('/src\\textarea.ls', module);
        topic = require('/src\\topic.ls', module);
        ref$ = require('/node_modules\\dom\\index.ls', module), $ = ref$.$, el = ref$.el;
        templateClearTextarea = require('/src\\reply\\templates\\clear-textarea.jadels', module);
        clearer = el(templateClearTextarea());
        if (that = $('.editor1')) {
            that.insertBefore(clearer, textarea);
            clearer.onclick = function () {
                textarea.value = '';
                localStorage.removeItem('post_' + topic.dataset.id);
            };
        }
    });
    require.define('/src\\reply\\templates\\clear-textarea.jadels', function (module, exports, __dirname, __filename) {
        var join;
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            return '<div class="clear-textarea">X</div>';
        };
    });
    require.define('/src\\topic-posts\\index.ls', function (module, exports, __dirname, __filename) {
        var jumps, autolink, updateCount;
        jumps = require('/src\\topic-posts\\jumps\\index.ls', module);
        autolink = require('/src\\topic-posts\\autolink.ls', module);
        updateCount = require('/src\\topic-posts\\update-count.ls', module);
    });
    require.define('/src\\topic-posts\\update-count.ls', function (module, exports, __dirname, __filename) {
        var topic, $$, pages, postCount, ref$, lastPosterName;
        topic = require('/src\\topic.ls', module);
        $$ = require('/node_modules\\dom\\index.ls', module).$$;
        pages = $$('#forum-actions-top .ui-pagination li:not(.cap-item)');
        if (pages && needUpdate()) {
            postCount = (ref$ = topic.getElementsByClassName('post-info'))[ref$.length - 1].getElementsByTagName('a')[0].getAttribute('href').from(1);
            lastPosterName = (ref$ = $$('.char-name-code', topic))[ref$.length - 1].innerHTML.trim();
            localStorage.setItem('topic_' + topic.dataset.id, postCount);
            localStorage.setItem('topic_lp_' + topic.dataset.id, lastPosterName);
        }
        function needUpdate() {
            return !pages.length || pages.length && 'current' === pages[pages.length - 1].className || !localStorage.getItem('topic_' + topic.dataset.id);
        }
    });
    require.define('/src\\topic-posts\\autolink.ls', function (module, exports, __dirname, __filename) {
        var autolink, $$, i$, ref$, len$, post;
        autolink = require('/node_modules\\autolink\\index.ls', module);
        $$ = require('/node_modules\\dom\\index.ls', module).$$;
        for (i$ = 0, len$ = (ref$ = $$('.post-detail')).length; i$ < len$; ++i$) {
            post = ref$[i$];
            if (post.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('blizzard')) {
                continue;
            }
            autolink(post);
        }
    });
    require.define('/src\\topic-posts\\jumps\\index.ls', function (module, exports, __dirname, __filename) {
        var unread;
        unread = require('/src\\topic-posts\\jumps\\unread.ls', module);
    });
    require.define('/src\\topic-posts\\jumps\\unread.ls', function (module, exports, __dirname, __filename) {
        var topic, bindKey, $$, lastPostId;
        topic = require('/src\\topic.ls', module);
        bindKey = require('/src\\cheatsheet\\bind-key.ls', module);
        $$ = require('/node_modules\\dom\\index.ls', module).$$;
        if (lastPostId = localStorage.getItem('topic_' + topic.dataset.id)) {
            bindKey('jf', 'jump-to-last-read', function () {
                var lastPostPage, ref$;
                lastPostPage = Math.ceil(lastPostId / 20);
                if (topic.dataset.page < lastPostPage) {
                    document.location = topic.dataset.url + ('?page=' + lastPostPage);
                } else {
                    if ((ref$ = $$('.post-detail')[lastPostId % 20 - 1]) != null) {
                        ref$.scrollIntoView();
                    }
                }
            });
        }
    });
    require.define('/src\\topic-characters\\index.ls', function (module, exports, __dirname, __filename) {
        var contextLinks, improveTopic, multiChars;
        contextLinks = require('/src\\topic-characters\\context-links.ls', module);
        improveTopic = require('/src\\topic-characters\\improve-topic.ls', module);
        multiChars = require('/src\\topic-characters\\multi-chars.ls', module);
    });
    require.define('/src\\topic-characters\\multi-chars.ls', function (module, exports, __dirname, __filename) {
        var ref$, $$, el, templateMultiChars, accountCharacters, that, modified, i$, len$, postCharacter, iconIgnore, link, ref1$, account, current, characters, postDetail, height, toggle, ul, limit, i, replace$ = ''.replace;
        ref$ = require('/node_modules\\dom\\index.ls', module), $$ = ref$.$$, el = ref$.el;
        templateMultiChars = require('/src\\topic-characters\\templates\\multi-chars.jadels', module);
        accountCharacters = (that = localStorage.getItem('accountCharacters')) ? JSON.parse(that) : {};
        function clean(it) {
            it = replace$.call(it, 'context-link', '');
            it = replace$.call(it, 'xmlns="http://www.w3.org/1999/xhtml" ', '');
            return it;
        }
        modified = false;
        for (i$ = 0, len$ = (ref$ = $$('.post-character')).length; i$ < len$; ++i$) {
            postCharacter = ref$[i$];
            iconIgnore = postCharacter.querySelector('.icon-ignore');
            if (!iconIgnore) {
                continue;
            }
            link = clean(postCharacter.querySelector('.user-name > a').outerHTML.trim());
            ref1$ = /ignore\(([0-9]+)/.exec(iconIgnore.onclick.toString()), account = ref1$[1];
            ref1$ = postCharacter.dataset;
            ref1$.account = account;
            ref1$.link = link;
            if (!in$(link, accountCharacters[account] || (accountCharacters[account] = []))) {
                modified = true;
                accountCharacters[account].push(link);
            }
        }
        if (modified) {
            localStorage.setItem('accountCharacters', JSON.stringify(accountCharacters));
        }
        for (i$ = 0, len$ = (ref$ = $$('.post:not(.hidden) .post-character')).length; i$ < len$; ++i$) {
            postCharacter = ref$[i$];
            ref1$ = postCharacter.dataset, account = ref1$.account, current = ref1$.link;
            if (!account) {
                continue;
            }
            characters = accountCharacters[account];
            if (characters.length === 1) {
                continue;
            }
            postDetail = postCharacter.parentNode.querySelector('.post-detail');
            height = postDetail.offsetHeight;
            toggle = characters.length > 2 && height < 130 + (characters.length - 1) * 15;
            postCharacter.appendChild(el(templateMultiChars({
                toggle: toggle,
                current: current,
                characters: characters
            })));
            if (toggle) {
                ul = postCharacter.querySelector('ul');
                if ((limit = ((height - 130) / 15).floor()) > 1) {
                    i = 0;
                    for (; i < limit; i++) {
                        ul.children[i].style.display = '';
                    }
                }
                toggle = postCharacter.querySelector('.toggle');
                fn$.call(this, ul, toggle, postCharacter);
            }
        }
        function in$(x, arr) {
            var i = -1, l = arr.length >>> 0;
            while (++i < l)
                if (x === arr[i] && i in arr)
                    return true;
            return false;
        }
        function fn$(ul, toggle, postCharacter) {
            toggle.onclick = function () {
                var i$, ref$, len$, li;
                for (i$ = 0, len$ = (ref$ = ul.children).length; i$ < len$; ++i$) {
                    li = ref$[i$];
                    li.style.display = '';
                }
                postCharacter.querySelector('.toggler').style.display = 'none';
                return toggle.onclick = function () {
                };
            };
        }
    });
    require.define('/src\\topic-characters\\templates\\multi-chars.jadels', function (module, exports, __dirname, __filename) {
        var lang, join;
        lang = require('/node_modules\\lang\\index.ls', module);
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            var character;
            return '    <div id="account-characters"><h1 class="toggle">' + (lang('otherCharacters') || '') + '\n' + ((locals.toggle ? '<span class="toggler">' + (' [+]' || '') + '</span>' : void 8) || '') + '</h1><br/><ul>' + (join(function () {
                var i$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = locals.characters.exclude(locals.current)).length; i$ < len$; ++i$) {
                    character = ref$[i$];
                    results$.push('<li style="' + [locals.toggle ? 'display: none' : void 8] + '">' + (character || '') + '</li>');
                }
                return results$;
            }()) || '') + '</ul></div>';
        };
    });
    require.define('/src\\topic-characters\\improve-topic.ls', function (module, exports, __dirname, __filename) {
        var i$, ref$, len$, infos, realm, ref1$;
        for (i$ = 0, len$ = (ref$ = document.getElementsByClassName('character-info')).length; i$ < len$; ++i$) {
            infos = ref$[i$];
            realm = infos.querySelector('.context-user span');
            if (!realm) {
                continue;
            }
            realm = realm.innerHTML;
            if ((ref1$ = infos.querySelector('.character-desc')) != null) {
                ref1$.innerHTML += '<br />' + realm;
            }
        }
    });
    require.define('/src\\topic-characters\\context-links.ls', function (module, exports, __dirname, __filename) {
        var topic, el, templateContextLinks, i$, ref$, len$, context, extraContext;
        topic = require('/src\\topic.ls', module);
        el = require('/node_modules\\dom\\index.ls', module).el;
        templateContextLinks = require('/src\\topic-characters\\templates\\context-links.jadels', module);
        for (i$ = 0, len$ = (ref$ = topic.querySelectorAll('.context-links')).length; i$ < len$; ++i$) {
            context = ref$[i$];
            if (context.children.length === 1) {
                continue;
            }
            extraContext = el(templateContextLinks({ link: context.children[0].href }));
            context.insertBefore(extraContext, context.querySelector('.link-last'));
        }
    });
    require.define('/src\\topic-characters\\templates\\context-links.jadels', function (module, exports, __dirname, __filename) {
        var join;
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            return '<span class="extra-links"><a href="' + locals.link + 'achievement" class="link-first extra-link">HF</a><a href="' + locals.link + 'statistic#21:152" class="link-first extra-link">PvP</a></span>';
        };
    });
    require.define('/src\\fix\\index.ls', function (module, exports, __dirname, __filename) {
        var htmlOverrides, menu, setView;
        htmlOverrides = require('/src\\fix\\html-overrides.ls', module);
        menu = require('/src\\fix\\menu.ls', module);
        setView = require('/src\\fix\\set-view.ls', module);
    });
    require.define('/src\\fix\\set-view.ls', function (module, exports, __dirname, __filename) {
        var w, ref$;
        w = require('/src\\w.ls', module);
        if ((ref$ = w.Cms) != null) {
            ref$.Forum.setView = function (type, target) {
                w.Cookie.create('forumView', type, {
                    path: '/',
                    expires: 8760
                });
                w.$(target).addClass('active').siblings().removeClass('active');
                return w.$('#posts').attr('class', type);
            };
        }
    });
    require.define('/src\\fix\\menu.ls', function (module, exports, __dirname, __filename) {
        var w, old;
        w = require('/src\\w.ls', module);
        old = w.Menu.show;
        w.Menu.show = function (arg$, arg1$, options) {
            var ref$, key$, x, ref1$;
            options == null && (options = {});
            (ref$ = w.Menu.dataIndex)[key$ = x = (ref1$ = options.set) != null ? ref1$ : 'base'] == null && (ref$[key$] = []);
            return old.apply(this, arguments);
        };
    });
    require.define('/src\\fix\\html-overrides.ls', function (module, exports, __dirname, __filename) {
        var lang, $, that, k, v, ref$;
        lang = require('/node_modules\\lang\\index.ls', module);
        $ = require('/node_modules\\dom\\index.ls', module).$;
        if (that = lang.htmlOverrides) {
            for (k in that) {
                v = that[k];
                if ((ref$ = $(k)) != null) {
                    ref$.innerHTML = v;
                }
            }
        }
    });
    require.define('/src\\jumps\\index.ls', function (module, exports, __dirname, __filename) {
        var $;
        $ = require('/node_modules\\dom\\index.ls', module).$;
        require('/src\\jumps\\top.ls', module);
        if (!$('.player-name')) {
            require('/src\\jumps\\login.ls', module);
        }
    });
    require.define('/src\\jumps\\login.ls', function (module, exports, __dirname, __filename) {
        var bindKey, w;
        bindKey = require('/src\\cheatsheet\\bind-key.ls', module);
        w = require('/src\\w.ls', module);
        bindKey('l', 'login', function () {
            w.Login.open('https://eu.battle.net/login/login.frag');
        });
    });
    require.define('/src\\jumps\\top.ls', function (module, exports, __dirname, __filename) {
        var bindKey, $;
        bindKey = require('/src\\cheatsheet\\bind-key.ls', module);
        $ = require('/node_modules\\dom\\index.ls', module).$;
        bindKey('t', 'page-top', function () {
            $('#logo').scrollIntoView();
        });
    });
    require.define('/src\\board\\css.ls', function (module, exports, __dirname, __filename) {
        var node, style;
        node = require('/node_modules\\dom\\index.ls', module).node;
        style = node('style', {
            type: 'text/css',
            innerHTML: '/*slake:build#compile-ls embeds css*/\n#forum-actions-top h1 {\n  text-align: center;\n  margin-left: 200px;\n}\n.forum .forum-actions {\n  padding: 0px;\n}\n.forum .actions-panel {\n  margin-right: 15px;\n}\n.forum .forum-options {\n  float: right;\n  right: auto;\n  position: relative;\n  margin-top: 25px;\n  margin-right: 15px;\n}\n.poster {\n  font-weight: bold;\n}\n.own-poster {\n  text-decoration: underline;\n}\na.show-topic {\n  cursor: pointer;\n  color: #008000;\n}\na.show-topic:hover {\n  color: #008000 !important;\n}\na.hide-topic {\n  cursor: pointer;\n  color: #f00;\n}\na.hide-topic:hover {\n  color: #f00 !important;\n}\n.last-read {\n  opacity: 0;\n}\ntr:hover .last-read {\n  opacity: 1;\n}\n.post-pages .last-read {\n  background-image: none !important;\n  background: none !important;\n}\ntr:not(.stickied) a[data-tooltip] {\n  display: inline !important;\n}\n#posts.advanced .tt-last-updated {\n  display: none;\n}\n#posts.advanced .post-author {\n  width: 15px;\n}\n#posts.advanced .post-views {\n  width: 15px;\n}\n#posts.advanced .post-lastPost {\n  width: 90px;\n  text-align: center;\n}\n#posts.advanced .post-lastPost .more-arrow {\n  display: none;\n}\n#posts.advanced .post-th .replies {\n  padding-right: 2px;\n  text-align: center;\n}\n#posts.advanced .post-th .poster {\n  text-align: right;\n  font-weight: normal;\n  padding-right: 5px;\n}\n#posts.advanced .post-th .last-post-th {\n  text-align: left;\n}\n#posts.advanced .post-last-updated {\n  width: 70px;\n}\n#posts.advanced .post-replies {\n  width: 10px;\n  text-align: right;\n  padding-right: 10px;\n}\n#posts.simple .tt-last-updated {\n  display: inline;\n}\n#posts.simple .last-post-th {\n  display: none;\n}\n#posts.simple .post-last-updated {\n  display: none;\n}\n.clear-textarea {\n  display: block;\n  margin: 1px 0 1px 553px;\n  font-weight: bold;\n  font-size: 2em;\n  position: absolute;\n  z-index: 2;\n  cursor: pointer;\n}\n#memebox {\n  position: relative;\n  float: right;\n  width: 150px;\n  top: 5px;\n}\n#memebox h1 {\n  font-size: 1.8em;\n  display: inline;\n}\n#memebox .hider {\n  color: #f00;\n  display: none;\n}\n#memebox:hover .hider {\n  display: inline;\n}\n#memebox .unhider {\n  color: #008000;\n  display: none;\n}\n#memebox:hover .unhider {\n  display: inline;\n}\n#memebox ul#memes {\n  margin-top: 10px;\n  margin-left: 30px;\n  list-style-type: circle;\n}\n#memebox li {\n  font-weight: bold;\n  color: link;\n  text-decoration: underline;\n}\n.context-links .extra-link {\n  background-image: none !important;\n  padding-left: 8px !important;\n  border-top-left-radius: 0px !important;\n  border-bottom-left-radius: 0px !important;\n}\n.ui-context {\n  width: 240px !important;\n}\n.karma {\n  white-space: normal !important;\n}\n.post-user .avatar {\n  top: 27px !important;\n}\n#account-characters {\n  margin-left: 30px;\n}\n#account-characters h1 {\n  display: inline;\n}\n#account-characters ul {\n  list-style: circle;\n  margin-left: 20px;\n}\n#account-characters a {\n  font-weight: bold;\n}\nimg.autolink {\n  border: 5px solid #000;\n  max-width: 540px;\n  max-height: 500px;\n}\n'
        });
        document.head.appendChild(style);
    });
    require.define('/src\\board\\content-class.ls', function (module, exports, __dirname, __filename) {
        var topic, forum, $, content;
        topic = require('/src\\topic.ls', module);
        forum = require('/src\\forum.ls', module);
        $ = require('/node_modules\\dom\\index.ls', module).$;
        content = $('#content');
        content.className = function () {
            switch (false) {
            case !topic:
                return 'topic';
            case !forum:
                return 'forum';
            default:
                return '';
            }
        }();
    });
    require.define('/node_modules\\sugar\\release\\sugar-full.development.js', function (module, exports, __dirname, __filename) {
        (function () {
            var object = Object, array = Array, regexp = RegExp, date = Date, string = String, number = Number, math = Math, Undefined;
            var globalContext = typeof global !== 'undefined' ? global : this;
            var typeChecks = {};
            var definePropertySupport = object.defineProperty && object.defineProperties;
            var ClassNames = 'Array,Boolean,Date,Function,Number,String,RegExp'.split(',');
            var isArray = buildClassCheck(ClassNames[0]);
            var isBoolean = buildClassCheck(ClassNames[1]);
            var isDate = buildClassCheck(ClassNames[2]);
            var isFunction = buildClassCheck(ClassNames[3]);
            var isNumber = buildClassCheck(ClassNames[4]);
            var isString = buildClassCheck(ClassNames[5]);
            var isRegExp = buildClassCheck(ClassNames[6]);
            function buildClassCheck(name) {
                var type, fn;
                if (/String|Number|Boolean/.test(name)) {
                    type = name.toLowerCase();
                }
                fn = name === 'Array' && array.isArray || function (obj) {
                    if (type && typeof obj === type) {
                        return true;
                    }
                    return className(obj) === '[object ' + name + ']';
                };
                typeChecks[name] = fn;
                return fn;
            }
            function className(obj) {
                return object.prototype.toString.call(obj);
            }
            function initializeClasses() {
                initializeClass(object);
                iterateOverObject(ClassNames, function (i, name) {
                    initializeClass(globalContext[name]);
                });
            }
            function initializeClass(klass) {
                if (!klass)
                    debugger;
                if (klass['SugarMethods'])
                    return;
                defineProperty(klass, 'SugarMethods', {});
                extend(klass, false, false, {
                    'extend': function (methods, override, instance) {
                        extend(klass, instance !== false, override, methods);
                    },
                    'sugarRestore': function () {
                        return batchMethodExecute(klass, arguments, function (target, name, m) {
                            defineProperty(target, name, m.method);
                        });
                    },
                    'sugarRevert': function () {
                        return batchMethodExecute(klass, arguments, function (target, name, m) {
                            if (m.existed) {
                                defineProperty(target, name, m.original);
                            } else {
                                delete target[name];
                            }
                        });
                    }
                });
            }
            function extend(klass, instance, override, methods) {
                var extendee = instance ? klass.prototype : klass;
                initializeClass(klass);
                iterateOverObject(methods, function (name, method) {
                    var original = extendee[name];
                    var existed = hasOwnProperty(extendee, name);
                    if (typeof override === 'function') {
                        method = wrapNative(extendee[name], method, override);
                    }
                    if (override !== false || !extendee[name]) {
                        defineProperty(extendee, name, method);
                    }
                    klass['SugarMethods'][name] = {
                        instance: instance,
                        method: method,
                        original: original,
                        existed: existed
                    };
                });
            }
            function extendSimilar(klass, instance, override, set, fn) {
                var methods = {};
                set = isString(set) ? set.split(',') : set;
                set.forEach(function (name, i) {
                    fn(methods, name, i);
                });
                extend(klass, instance, override, methods);
            }
            function batchMethodExecute(klass, args, fn) {
                var all = args.length === 0, methods = multiArgs(args), changed = false;
                iterateOverObject(klass['SugarMethods'], function (name, m) {
                    if (all || methods.indexOf(name) > -1) {
                        changed = true;
                        fn(m.instance ? klass.prototype : klass, name, m);
                    }
                });
                return changed;
            }
            function wrapNative(nativeFn, extendedFn, condition) {
                return function () {
                    var fn;
                    if (nativeFn && (condition === true || !condition.apply(this, arguments))) {
                        fn = nativeFn;
                    } else {
                        fn = extendedFn;
                    }
                    return fn.apply(this, arguments);
                };
            }
            function defineProperty(target, name, method) {
                if (definePropertySupport) {
                    object.defineProperty(target, name, {
                        'value': method,
                        'configurable': true,
                        'enumerable': false,
                        'writable': true
                    });
                } else {
                    target[name] = method;
                }
            }
            function multiArgs(args, fn) {
                var result = [], i, len;
                for (i = 0, len = args.length; i < len; i++) {
                    result.push(args[i]);
                    if (fn)
                        fn.call(args, args[i], i);
                }
                return result;
            }
            function flattenedArgs(obj, fn, from) {
                multiArgs(array.prototype.concat.apply([], array.prototype.slice.call(obj, from || 0)), fn);
            }
            function checkCallback(fn) {
                if (!fn || !fn.call) {
                    throw new TypeError('Callback is not callable');
                }
            }
            function isDefined(o) {
                return o !== Undefined;
            }
            function isUndefined(o) {
                return o === Undefined;
            }
            function isObjectPrimitive(obj) {
                return obj && typeof obj === 'object';
            }
            function isObject(obj) {
                return !!obj && className(obj) === '[object Object]' && 'hasOwnProperty' in obj;
            }
            function hasOwnProperty(obj, key) {
                return object['hasOwnProperty'].call(obj, key);
            }
            function iterateOverObject(obj, fn) {
                var key;
                for (key in obj) {
                    if (!hasOwnProperty(obj, key))
                        continue;
                    if (fn.call(obj, key, obj[key], obj) === false)
                        break;
                }
            }
            function simpleMerge(target, source) {
                iterateOverObject(source, function (key) {
                    target[key] = source[key];
                });
                return target;
            }
            function Hash(obj) {
                simpleMerge(this, obj);
            }
            ;
            Hash.prototype.constructor = object;
            function getRange(start, stop, fn, step) {
                var arr = [], i = parseInt(start), down = step < 0;
                while (!down && i <= stop || down && i >= stop) {
                    arr.push(i);
                    if (fn)
                        fn.call(this, i);
                    i += step || 1;
                }
                return arr;
            }
            function round(val, precision, method) {
                var fn = math[method || 'round'];
                var multiplier = math.pow(10, math.abs(precision || 0));
                if (precision < 0)
                    multiplier = 1 / multiplier;
                return fn(val * multiplier) / multiplier;
            }
            function ceil(val, precision) {
                return round(val, precision, 'ceil');
            }
            function floor(val, precision) {
                return round(val, precision, 'floor');
            }
            function padNumber(num, place, sign, base) {
                var str = math.abs(num).toString(base || 10);
                str = repeatString(place - str.replace(/\.\d+/, '').length, '0') + str;
                if (sign || num < 0) {
                    str = (num < 0 ? '-' : '+') + str;
                }
                return str;
            }
            function getOrdinalizedSuffix(num) {
                if (num >= 11 && num <= 13) {
                    return 'th';
                } else {
                    switch (num % 10) {
                    case 1:
                        return 'st';
                    case 2:
                        return 'nd';
                    case 3:
                        return 'rd';
                    default:
                        return 'th';
                    }
                }
            }
            function getTrimmableCharacters() {
                return '\t\n\v\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u2028\u2029\u3000\ufeff';
            }
            function repeatString(times, str) {
                return array(math.max(0, isDefined(times) ? times : 1) + 1).join(str || '');
            }
            function getRegExpFlags(reg, add) {
                var flags = reg.toString().match(/[^/]*$/)[0];
                if (add) {
                    flags = (flags + add).split('').sort().join('').replace(/([gimy])\1+/g, '$1');
                }
                return flags;
            }
            function escapeRegExp(str) {
                if (!isString(str))
                    str = string(str);
                return str.replace(/([\\/'*+?|()\[\]{}.^$])/g, '\\$1');
            }
            function stringify(thing, stack) {
                var type = typeof thing, thingIsObject, thingIsArray, klass, value, arr, key, i, len;
                if (type === 'string')
                    return thing;
                klass = object.prototype.toString.call(thing);
                thingIsObject = isObject(thing);
                thingIsArray = klass === '[object Array]';
                if (thing != null && thingIsObject || thingIsArray) {
                    if (!stack)
                        stack = [];
                    if (stack.length > 1) {
                        i = stack.length;
                        while (i--) {
                            if (stack[i] === thing) {
                                return 'CYC';
                            }
                        }
                    }
                    stack.push(thing);
                    value = string(thing.constructor);
                    arr = thingIsArray ? thing : object.keys(thing).sort();
                    for (i = 0, len = arr.length; i < len; i++) {
                        key = thingIsArray ? i : arr[i];
                        value += key + stringify(thing[key], stack);
                    }
                    stack.pop();
                } else if (1 / thing === -Infinity) {
                    value = '-0';
                } else {
                    value = string(thing && thing.valueOf ? thing.valueOf() : thing);
                }
                return type + klass + value;
            }
            function isEqual(a, b) {
                if (objectIsMatchedByValue(a) && objectIsMatchedByValue(b)) {
                    return stringify(a) === stringify(b);
                } else {
                    return a === b;
                }
            }
            function objectIsMatchedByValue(obj) {
                var klass = className(obj);
                return /^\[object Date|Array|String|Number|RegExp|Boolean|Arguments\]$/.test(klass) || isObject(obj);
            }
            function entryAtIndex(arr, args, str) {
                var result = [], length = arr.length, loop = args[args.length - 1] !== false, r;
                multiArgs(args, function (index) {
                    if (isBoolean(index))
                        return false;
                    if (loop) {
                        index = index % length;
                        if (index < 0)
                            index = length + index;
                    }
                    r = str ? arr.charAt(index) || '' : arr[index];
                    result.push(r);
                });
                return result.length < 2 ? result[0] : result;
            }
            function buildObjectInstanceMethods(set, target) {
                extendSimilar(target, true, false, set, function (methods, name) {
                    methods[name + (name === 'equal' ? 's' : '')] = function () {
                        return object[name].apply(null, [this].concat(multiArgs(arguments)));
                    };
                });
            }
            initializeClasses();
            extend(object, false, false, {
                'keys': function (obj) {
                    var keys = [];
                    if (!isObjectPrimitive(obj) && !isRegExp(obj) && !isFunction(obj)) {
                        throw new TypeError('Object required');
                    }
                    iterateOverObject(obj, function (key, value) {
                        keys.push(key);
                    });
                    return keys;
                }
            });
            function arrayIndexOf(arr, search, fromIndex, increment) {
                var length = arr.length, fromRight = increment == -1, start = fromRight ? length - 1 : 0, index = toIntegerWithDefault(fromIndex, start);
                if (index < 0) {
                    index = length + index;
                }
                if (!fromRight && index < 0 || fromRight && index >= length) {
                    index = start;
                }
                while (fromRight && index >= 0 || !fromRight && index < length) {
                    if (arr[index] === search) {
                        return index;
                    }
                    index += increment;
                }
                return -1;
            }
            function arrayReduce(arr, fn, initialValue, fromRight) {
                var length = arr.length, count = 0, defined = isDefined(initialValue), result, index;
                checkCallback(fn);
                if (length == 0 && !defined) {
                    throw new TypeError('Reduce called on empty array with no initial value');
                } else if (defined) {
                    result = initialValue;
                } else {
                    result = arr[fromRight ? length - 1 : count];
                    count++;
                }
                while (count < length) {
                    index = fromRight ? length - count - 1 : count;
                    if (index in arr) {
                        result = fn(result, arr[index], index, arr);
                    }
                    count++;
                }
                return result;
            }
            function toIntegerWithDefault(i, d) {
                if (isNaN(i)) {
                    return d;
                } else {
                    return parseInt(i >> 0);
                }
            }
            function checkFirstArgumentExists(args) {
                if (args.length === 0) {
                    throw new TypeError('First argument must be defined');
                }
            }
            extend(array, false, false, {
                'isArray': function (obj) {
                    return isArray(obj);
                }
            });
            extend(array, true, false, {
                'every': function (fn, scope) {
                    var length = this.length, index = 0;
                    checkFirstArgumentExists(arguments);
                    while (index < length) {
                        if (index in this && !fn.call(scope, this[index], index, this)) {
                            return false;
                        }
                        index++;
                    }
                    return true;
                },
                'some': function (fn, scope) {
                    var length = this.length, index = 0;
                    checkFirstArgumentExists(arguments);
                    while (index < length) {
                        if (index in this && fn.call(scope, this[index], index, this)) {
                            return true;
                        }
                        index++;
                    }
                    return false;
                },
                'map': function (fn, scope) {
                    var length = this.length, index = 0, result = new Array(length);
                    checkFirstArgumentExists(arguments);
                    while (index < length) {
                        if (index in this) {
                            result[index] = fn.call(scope, this[index], index, this);
                        }
                        index++;
                    }
                    return result;
                },
                'filter': function (fn, scope) {
                    var length = this.length, index = 0, result = [];
                    checkFirstArgumentExists(arguments);
                    while (index < length) {
                        if (index in this && fn.call(scope, this[index], index, this)) {
                            result.push(this[index]);
                        }
                        index++;
                    }
                    return result;
                },
                'indexOf': function (search, fromIndex) {
                    if (isString(this))
                        return this.indexOf(search, fromIndex);
                    return arrayIndexOf(this, search, fromIndex, 1);
                },
                'lastIndexOf': function (search, fromIndex) {
                    if (isString(this))
                        return this.lastIndexOf(search, fromIndex);
                    return arrayIndexOf(this, search, fromIndex, -1);
                },
                'forEach': function (fn, scope) {
                    var length = this.length, index = 0;
                    checkCallback(fn);
                    while (index < length) {
                        if (index in this) {
                            fn.call(scope, this[index], index, this);
                        }
                        index++;
                    }
                },
                'reduce': function (fn, init) {
                    return arrayReduce(this, fn, init);
                },
                'reduceRight': function (fn, init) {
                    return arrayReduce(this, fn, init, true);
                }
            });
            function buildTrim() {
                var support = getTrimmableCharacters().match(/^\s+$/);
                try {
                    string.prototype.trim.call([1]);
                } catch (e) {
                    support = false;
                }
                extend(string, true, !support, {
                    'trim': function () {
                        return this.toString().trimLeft().trimRight();
                    },
                    'trimLeft': function () {
                        return this.replace(regexp('^[' + getTrimmableCharacters() + ']+'), '');
                    },
                    'trimRight': function () {
                        return this.replace(regexp('[' + getTrimmableCharacters() + ']+$'), '');
                    }
                });
            }
            extend(Function, true, false, {
                'bind': function (scope) {
                    var fn = this, args = multiArgs(arguments).slice(1), nop, bound;
                    if (!isFunction(this)) {
                        throw new TypeError('Function.prototype.bind called on a non-function');
                    }
                    bound = function () {
                        return fn.apply(fn.prototype && this instanceof fn ? this : scope, args.concat(multiArgs(arguments)));
                    };
                    bound.prototype = this.prototype;
                    return bound;
                }
            });
            extend(date, false, false, {
                'now': function () {
                    return new date().getTime();
                }
            });
            function buildISOString() {
                var d = new date(date.UTC(1999, 11, 31)), target = '1999-12-31T00:00:00.000Z';
                var support = d.toISOString && d.toISOString() === target;
                extendSimilar(date, true, !support, 'toISOString,toJSON', function (methods, name) {
                    methods[name] = function () {
                        return padNumber(this.getUTCFullYear(), 4) + '-' + padNumber(this.getUTCMonth() + 1, 2) + '-' + padNumber(this.getUTCDate(), 2) + 'T' + padNumber(this.getUTCHours(), 2) + ':' + padNumber(this.getUTCMinutes(), 2) + ':' + padNumber(this.getUTCSeconds(), 2) + '.' + padNumber(this.getUTCMilliseconds(), 3) + 'Z';
                    };
                });
            }
            buildTrim();
            buildISOString();
            function multiMatch(el, match, scope, params) {
                var result = true;
                if (el === match) {
                    return true;
                } else if (isRegExp(match) && isString(el)) {
                    return regexp(match).test(el);
                } else if (isFunction(match)) {
                    return match.apply(scope, params);
                } else if (isObject(match) && isObjectPrimitive(el)) {
                    iterateOverObject(match, function (key, value) {
                        if (!multiMatch(el[key], match[key], scope, [
                                el[key],
                                el
                            ])) {
                            result = false;
                        }
                    });
                    return result;
                } else {
                    return isEqual(el, match);
                }
            }
            function transformArgument(el, map, context, mapArgs) {
                if (isUndefined(map)) {
                    return el;
                } else if (isFunction(map)) {
                    return map.apply(context, mapArgs || []);
                } else if (isFunction(el[map])) {
                    return el[map].call(el);
                } else {
                    return el[map];
                }
            }
            function arrayEach(arr, fn, startIndex, loop) {
                var length, index, i;
                if (startIndex < 0)
                    startIndex = arr.length + startIndex;
                i = isNaN(startIndex) ? 0 : startIndex;
                length = loop === true ? arr.length + i : arr.length;
                while (i < length) {
                    index = i % arr.length;
                    if (!(index in arr)) {
                        return iterateOverSparseArray(arr, fn, i, loop);
                    } else if (fn.call(arr, arr[index], index, arr) === false) {
                        break;
                    }
                    i++;
                }
            }
            function iterateOverSparseArray(arr, fn, fromIndex, loop) {
                var indexes = [], i;
                for (i in arr) {
                    if (isArrayIndex(arr, i) && i >= fromIndex) {
                        indexes.push(parseInt(i));
                    }
                }
                indexes.sort().each(function (index) {
                    return fn.call(arr, arr[index], index, arr);
                });
                return arr;
            }
            function isArrayIndex(arr, i) {
                return i in arr && toUInt32(i) == i && i != 4294967295;
            }
            function toUInt32(i) {
                return i >>> 0;
            }
            function arrayFind(arr, f, startIndex, loop, returnIndex) {
                var result, index;
                arrayEach(arr, function (el, i, arr) {
                    if (multiMatch(el, f, arr, [
                            el,
                            i,
                            arr
                        ])) {
                        result = el;
                        index = i;
                        return false;
                    }
                }, startIndex, loop);
                return returnIndex ? index : result;
            }
            function arrayUnique(arr, map) {
                var result = [], o = {}, transformed;
                arrayEach(arr, function (el, i) {
                    transformed = map ? transformArgument(el, map, arr, [
                        el,
                        i,
                        arr
                    ]) : el;
                    if (!checkForElementInHashAndSet(o, transformed)) {
                        result.push(el);
                    }
                });
                return result;
            }
            function arrayIntersect(arr1, arr2, subtract) {
                var result = [], o = {};
                arr2.each(function (el) {
                    checkForElementInHashAndSet(o, el);
                });
                arr1.each(function (el) {
                    var stringified = stringify(el), isReference = !objectIsMatchedByValue(el);
                    if (elementExistsInHash(o, stringified, el, isReference) != subtract) {
                        discardElementFromHash(o, stringified, el, isReference);
                        result.push(el);
                    }
                });
                return result;
            }
            function arrayFlatten(arr, level, current) {
                level = level || Infinity;
                current = current || 0;
                var result = [];
                arrayEach(arr, function (el) {
                    if (isArray(el) && current < level) {
                        result = result.concat(arrayFlatten(el, level, current + 1));
                    } else {
                        result.push(el);
                    }
                });
                return result;
            }
            function flatArguments(args) {
                var result = [];
                multiArgs(args, function (arg) {
                    result = result.concat(arg);
                });
                return result;
            }
            function elementExistsInHash(hash, key, element, isReference) {
                var exists = key in hash;
                if (isReference) {
                    if (!hash[key]) {
                        hash[key] = [];
                    }
                    exists = hash[key].indexOf(element) !== -1;
                }
                return exists;
            }
            function checkForElementInHashAndSet(hash, element) {
                var stringified = stringify(element), isReference = !objectIsMatchedByValue(element), exists = elementExistsInHash(hash, stringified, element, isReference);
                if (isReference) {
                    hash[stringified].push(element);
                } else {
                    hash[stringified] = element;
                }
                return exists;
            }
            function discardElementFromHash(hash, key, element, isReference) {
                var arr, i = 0;
                if (isReference) {
                    arr = hash[key];
                    while (i < arr.length) {
                        if (arr[i] === element) {
                            arr.splice(i, 1);
                        } else {
                            i += 1;
                        }
                    }
                } else {
                    delete hash[key];
                }
            }
            function getMinOrMax(obj, map, which, all) {
                var edge, result = [], max = which === 'max', min = which === 'min', isArray = Array.isArray(obj);
                iterateOverObject(obj, function (key) {
                    var el = obj[key], test = transformArgument(el, map, obj, isArray ? [
                            el,
                            parseInt(key),
                            obj
                        ] : []);
                    if (isUndefined(test)) {
                        throw new TypeError('Cannot compare with undefined');
                    }
                    if (test === edge) {
                        result.push(el);
                    } else if (isUndefined(edge) || max && test > edge || min && test < edge) {
                        result = [el];
                        edge = test;
                    }
                });
                if (!isArray)
                    result = arrayFlatten(result, 1);
                return all ? result : result[0];
            }
            function collateStrings(a, b) {
                var aValue, bValue, aChar, bChar, aEquiv, bEquiv, index = 0, tiebreaker = 0;
                a = getCollationReadyString(a);
                b = getCollationReadyString(b);
                do {
                    aChar = getCollationCharacter(a, index);
                    bChar = getCollationCharacter(b, index);
                    aValue = getCollationValue(aChar);
                    bValue = getCollationValue(bChar);
                    if (aValue === -1 || bValue === -1) {
                        aValue = a.charCodeAt(index) || null;
                        bValue = b.charCodeAt(index) || null;
                    }
                    aEquiv = aChar !== a.charAt(index);
                    bEquiv = bChar !== b.charAt(index);
                    if (aEquiv !== bEquiv && tiebreaker === 0) {
                        tiebreaker = aEquiv - bEquiv;
                    }
                    index += 1;
                } while (aValue != null && bValue != null && aValue === bValue);
                if (aValue === bValue)
                    return tiebreaker;
                return aValue < bValue ? -1 : 1;
            }
            function getCollationReadyString(str) {
                if (array[AlphanumericSortIgnoreCase]) {
                    str = str.toLowerCase();
                }
                return str.replace(array[AlphanumericSortIgnore], '');
            }
            function getCollationCharacter(str, index) {
                var chr = str.charAt(index), eq = array[AlphanumericSortEquivalents] || {};
                return eq[chr] || chr;
            }
            function getCollationValue(chr) {
                var order = array[AlphanumericSortOrder];
                if (!chr) {
                    return null;
                } else {
                    return order.indexOf(chr);
                }
            }
            var AlphanumericSortOrder = 'AlphanumericSortOrder';
            var AlphanumericSortIgnore = 'AlphanumericSortIgnore';
            var AlphanumericSortIgnoreCase = 'AlphanumericSortIgnoreCase';
            var AlphanumericSortEquivalents = 'AlphanumericSortEquivalents';
            function buildEnhancements() {
                var callbackCheck = function () {
                    var a = arguments;
                    return a.length > 0 && !isFunction(a[0]);
                };
                extendSimilar(array, true, callbackCheck, 'map,every,all,some,any,none,filter', function (methods, name) {
                    methods[name] = function (f) {
                        return this[name](function (el, index) {
                            if (name === 'map') {
                                return transformArgument(el, f, this, [
                                    el,
                                    index,
                                    this
                                ]);
                            } else {
                                return multiMatch(el, f, this, [
                                    el,
                                    index,
                                    this
                                ]);
                            }
                        });
                    };
                });
            }
            function buildAlphanumericSort() {
                var order = 'A\xc1\xc0\xc2\xc3\u0104BC\u0106\u010c\xc7D\u010e\xd0E\xc9\xc8\u011a\xca\xcb\u0118FG\u011eH\u0131I\xcd\xcc\u0130\xce\xcfJKL\u0141MN\u0143\u0147\xd1O\xd3\xd2\xd4PQR\u0158S\u015a\u0160\u015eT\u0164U\xda\xd9\u016e\xdb\xdcVWXY\xddZ\u0179\u017b\u017d\xde\xc6\u0152\xd8\xd5\xc5\xc4\xd6';
                var equiv = 'A\xc1\xc0\xc2\xc3\xc4,C\xc7,E\xc9\xc8\xca\xcb,I\xcd\xcc\u0130\xce\xcf,O\xd3\xd2\xd4\xd5\xd6,S\xdf,U\xda\xd9\xdb\xdc';
                array[AlphanumericSortOrder] = order.split('').map(function (str) {
                    return str + str.toLowerCase();
                }).join('');
                var equivalents = {};
                arrayEach(equiv.split(','), function (set) {
                    var equivalent = set.charAt(0);
                    arrayEach(set.slice(1).split(''), function (chr) {
                        equivalents[chr] = equivalent;
                        equivalents[chr.toLowerCase()] = equivalent.toLowerCase();
                    });
                });
                array[AlphanumericSortIgnoreCase] = true;
                array[AlphanumericSortEquivalents] = equivalents;
            }
            extend(array, false, false, {
                'create': function () {
                    var result = [], tmp;
                    multiArgs(arguments, function (a) {
                        if (isObjectPrimitive(a)) {
                            try {
                                tmp = array.prototype.slice.call(a, 0);
                                if (tmp.length > 0) {
                                    a = tmp;
                                }
                            } catch (e) {
                            }
                            ;
                        }
                        result = result.concat(a);
                    });
                    return result;
                }
            });
            extend(array, true, false, {
                'find': function (f, index, loop) {
                    return arrayFind(this, f, index, loop);
                },
                'findAll': function (f, index, loop) {
                    var result = [];
                    arrayEach(this, function (el, i, arr) {
                        if (multiMatch(el, f, arr, [
                                el,
                                i,
                                arr
                            ])) {
                            result.push(el);
                        }
                    }, index, loop);
                    return result;
                },
                'findIndex': function (f, startIndex, loop) {
                    var index = arrayFind(this, f, startIndex, loop, true);
                    return isUndefined(index) ? -1 : index;
                },
                'count': function (f) {
                    if (isUndefined(f))
                        return this.length;
                    return this.findAll(f).length;
                },
                'removeAt': function (start, end) {
                    var i, len;
                    if (isUndefined(start))
                        return this;
                    if (isUndefined(end))
                        end = start;
                    for (i = 0, len = end - start; i <= len; i++) {
                        this.splice(start, 1);
                    }
                    return this;
                },
                'include': function (el, index) {
                    return this.clone().add(el, index);
                },
                'exclude': function () {
                    return array.prototype.remove.apply(this.clone(), arguments);
                },
                'clone': function () {
                    return simpleMerge([], this);
                },
                'unique': function (map) {
                    return arrayUnique(this, map);
                },
                'flatten': function (limit) {
                    return arrayFlatten(this, limit);
                },
                'union': function () {
                    return arrayUnique(this.concat(flatArguments(arguments)));
                },
                'intersect': function () {
                    return arrayIntersect(this, flatArguments(arguments), false);
                },
                'subtract': function (a) {
                    return arrayIntersect(this, flatArguments(arguments), true);
                },
                'at': function () {
                    return entryAtIndex(this, arguments);
                },
                'first': function (num) {
                    if (isUndefined(num))
                        return this[0];
                    if (num < 0)
                        num = 0;
                    return this.slice(0, num);
                },
                'last': function (num) {
                    if (isUndefined(num))
                        return this[this.length - 1];
                    var start = this.length - num < 0 ? 0 : this.length - num;
                    return this.slice(start);
                },
                'from': function (num) {
                    return this.slice(num);
                },
                'to': function (num) {
                    if (isUndefined(num))
                        num = this.length;
                    return this.slice(0, num);
                },
                'min': function (map, all) {
                    return getMinOrMax(this, map, 'min', all);
                },
                'max': function (map, all) {
                    return getMinOrMax(this, map, 'max', all);
                },
                'least': function (map, all) {
                    return getMinOrMax(this.groupBy.apply(this, [map]), 'length', 'min', all);
                },
                'most': function (map, all) {
                    return getMinOrMax(this.groupBy.apply(this, [map]), 'length', 'max', all);
                },
                'sum': function (map) {
                    var arr = map ? this.map(map) : this;
                    return arr.length > 0 ? arr.reduce(function (a, b) {
                        return a + b;
                    }) : 0;
                },
                'average': function (map) {
                    var arr = map ? this.map(map) : this;
                    return arr.length > 0 ? arr.sum() / arr.length : 0;
                },
                'inGroups': function (num, padding) {
                    var pad = arguments.length > 1;
                    var arr = this;
                    var result = [];
                    var divisor = ceil(this.length / num);
                    getRange(0, num - 1, function (i) {
                        var index = i * divisor;
                        var group = arr.slice(index, index + divisor);
                        if (pad && group.length < divisor) {
                            getRange(1, divisor - group.length, function () {
                                group = group.add(padding);
                            });
                        }
                        result.push(group);
                    });
                    return result;
                },
                'inGroupsOf': function (num, padding) {
                    var result = [], len = this.length, arr = this, group;
                    if (len === 0 || num === 0)
                        return arr;
                    if (isUndefined(num))
                        num = 1;
                    if (isUndefined(padding))
                        padding = null;
                    getRange(0, ceil(len / num) - 1, function (i) {
                        group = arr.slice(num * i, num * i + num);
                        while (group.length < num) {
                            group.push(padding);
                        }
                        result.push(group);
                    });
                    return result;
                },
                'isEmpty': function () {
                    return this.compact().length == 0;
                },
                'sortBy': function (map, desc) {
                    var arr = this.clone();
                    arr.sort(function (a, b) {
                        var aProperty, bProperty, comp;
                        aProperty = transformArgument(a, map, arr, [a]);
                        bProperty = transformArgument(b, map, arr, [b]);
                        if (isString(aProperty) && isString(bProperty)) {
                            comp = collateStrings(aProperty, bProperty);
                        } else if (aProperty < bProperty) {
                            comp = -1;
                        } else if (aProperty > bProperty) {
                            comp = 1;
                        } else {
                            comp = 0;
                        }
                        return comp * (desc ? -1 : 1);
                    });
                    return arr;
                },
                'randomize': function () {
                    var arr = this.concat(), i = arr.length, j, x;
                    while (i) {
                        j = math.random() * i | 0;
                        x = arr[--i];
                        arr[i] = arr[j];
                        arr[j] = x;
                    }
                    return arr;
                },
                'zip': function () {
                    var args = multiArgs(arguments);
                    return this.map(function (el, i) {
                        return [el].concat(args.map(function (k) {
                            return i in k ? k[i] : null;
                        }));
                    });
                },
                'sample': function (num) {
                    var arr = this.randomize();
                    return arguments.length > 0 ? arr.slice(0, num) : arr[0];
                },
                'each': function (fn, index, loop) {
                    arrayEach(this, fn, index, loop);
                    return this;
                },
                'add': function (el, index) {
                    if (!isNumber(number(index)) || isNaN(index))
                        index = this.length;
                    array.prototype.splice.apply(this, [
                        index,
                        0
                    ].concat(el));
                    return this;
                },
                'remove': function () {
                    var i, arr = this;
                    multiArgs(arguments, function (f) {
                        i = 0;
                        while (i < arr.length) {
                            if (multiMatch(arr[i], f, arr, [
                                    arr[i],
                                    i,
                                    arr
                                ])) {
                                arr.splice(i, 1);
                            } else {
                                i++;
                            }
                        }
                    });
                    return arr;
                },
                'compact': function (all) {
                    var result = [];
                    arrayEach(this, function (el, i) {
                        if (isArray(el)) {
                            result.push(el.compact());
                        } else if (all && el) {
                            result.push(el);
                        } else if (!all && el != null && el.valueOf() === el.valueOf()) {
                            result.push(el);
                        }
                    });
                    return result;
                },
                'groupBy': function (map, fn) {
                    var arr = this, result = {}, key;
                    arrayEach(arr, function (el, index) {
                        key = transformArgument(el, map, arr, [
                            el,
                            index,
                            arr
                        ]);
                        if (!result[key])
                            result[key] = [];
                        result[key].push(el);
                    });
                    if (fn) {
                        iterateOverObject(result, fn);
                    }
                    return result;
                },
                'none': function () {
                    return !this.any.apply(this, arguments);
                }
            });
            extend(array, true, false, {
                'all': array.prototype.every,
                'any': array.prototype.some,
                'insert': array.prototype.add
            });
            function keysWithCoercion(obj) {
                if (obj && obj.valueOf) {
                    obj = obj.valueOf();
                }
                return object.keys(obj);
            }
            function buildEnumerableMethods(names, mapping) {
                extendSimilar(object, false, false, names, function (methods, name) {
                    methods[name] = function (obj, arg1, arg2) {
                        var result, coerced = keysWithCoercion(obj);
                        result = array.prototype[name].call(coerced, function (key) {
                            if (mapping) {
                                return transformArgument(obj[key], arg1, obj, [
                                    key,
                                    obj[key],
                                    obj
                                ]);
                            } else {
                                return multiMatch(obj[key], arg1, obj, [
                                    key,
                                    obj[key],
                                    obj
                                ]);
                            }
                        }, arg2);
                        if (isArray(result)) {
                            result = result.reduce(function (o, key, i) {
                                o[key] = obj[key];
                                return o;
                            }, {});
                        }
                        return result;
                    };
                });
                buildObjectInstanceMethods(names, Hash);
            }
            extend(object, false, false, {
                'map': function (obj, map) {
                    return keysWithCoercion(obj).reduce(function (result, key) {
                        result[key] = transformArgument(obj[key], map, obj, [
                            key,
                            obj[key],
                            obj
                        ]);
                        return result;
                    }, {});
                },
                'reduce': function (obj) {
                    var values = keysWithCoercion(obj).map(function (key) {
                            return obj[key];
                        });
                    return values.reduce.apply(values, multiArgs(arguments).slice(1));
                },
                'each': function (obj, fn) {
                    checkCallback(fn);
                    iterateOverObject(obj, fn);
                    return obj;
                },
                'size': function (obj) {
                    return keysWithCoercion(obj).length;
                }
            });
            var EnumerableFindingMethods = 'any,all,none,count,find,findAll,isEmpty'.split(',');
            var EnumerableMappingMethods = 'sum,average,min,max,least,most'.split(',');
            var EnumerableOtherMethods = 'map,reduce,size'.split(',');
            var EnumerableMethods = EnumerableFindingMethods.concat(EnumerableMappingMethods).concat(EnumerableOtherMethods);
            buildEnhancements();
            buildAlphanumericSort();
            buildEnumerableMethods(EnumerableFindingMethods);
            buildEnumerableMethods(EnumerableMappingMethods, true);
            buildObjectInstanceMethods(EnumerableOtherMethods, Hash);
            var English;
            var CurrentLocalization;
            var TimeFormat = [
                    'ampm',
                    'hour',
                    'minute',
                    'second',
                    'ampm',
                    'utc',
                    'offset_sign',
                    'offset_hours',
                    'offset_minutes',
                    'ampm'
                ];
            var DecimalReg = '(?:[,.]\\d+)?';
            var HoursReg = '\\d{1,2}' + DecimalReg;
            var SixtyReg = '[0-5]\\d' + DecimalReg;
            var RequiredTime = '({t})?\\s*(' + HoursReg + ')(?:{h}(' + SixtyReg + ')?{m}(?::?(' + SixtyReg + '){s})?\\s*(?:({t})|(Z)|(?:([+-])(\\d{2,2})(?::?(\\d{2,2}))?)?)?|\\s*({t}))';
            var KanjiDigits = '\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07';
            var FullWidthDigits = '\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19';
            var AsianDigitMap = {};
            var AsianDigitReg;
            var DateArgumentUnits;
            var DateUnitsReversed;
            var CoreDateFormats = [];
            var DateOutputFormats = [
                    {
                        token: 'f{1,4}|ms|milliseconds',
                        format: function (d) {
                            return callDateGet(d, 'Milliseconds');
                        }
                    },
                    {
                        token: 'ss?|seconds',
                        format: function (d, len) {
                            return callDateGet(d, 'Seconds');
                        }
                    },
                    {
                        token: 'mm?|minutes',
                        format: function (d, len) {
                            return callDateGet(d, 'Minutes');
                        }
                    },
                    {
                        token: 'hh?|hours|12hr',
                        format: function (d) {
                            return getShortHour(d);
                        }
                    },
                    {
                        token: 'HH?|24hr',
                        format: function (d) {
                            return callDateGet(d, 'Hours');
                        }
                    },
                    {
                        token: 'dd?|date|day',
                        format: function (d) {
                            return callDateGet(d, 'Date');
                        }
                    },
                    {
                        token: 'dow|weekday',
                        word: true,
                        format: function (d, loc, n, t) {
                            var dow = callDateGet(d, 'Day');
                            return loc['weekdays'][dow + (n - 1) * 7];
                        }
                    },
                    {
                        token: 'MM?',
                        format: function (d) {
                            return callDateGet(d, 'Month') + 1;
                        }
                    },
                    {
                        token: 'mon|month',
                        word: true,
                        format: function (d, loc, n, len) {
                            var month = callDateGet(d, 'Month');
                            return loc['months'][month + (n - 1) * 12];
                        }
                    },
                    {
                        token: 'y{2,4}|year',
                        format: function (d) {
                            return callDateGet(d, 'FullYear');
                        }
                    },
                    {
                        token: '[Tt]{1,2}',
                        format: function (d, loc, n, format) {
                            if (loc['ampm'].length == 0)
                                return '';
                            var hours = callDateGet(d, 'Hours');
                            var str = loc['ampm'][floor(hours / 12)];
                            if (format.length === 1)
                                str = str.slice(0, 1);
                            if (format.slice(0, 1) === 'T')
                                str = str.toUpperCase();
                            return str;
                        }
                    },
                    {
                        token: 'z{1,4}|tz|timezone',
                        text: true,
                        format: function (d, loc, n, format) {
                            var tz = d.getUTCOffset();
                            if (format == 'z' || format == 'zz') {
                                tz = tz.replace(/(\d{2})(\d{2})/, function (f, h, m) {
                                    return padNumber(h, format.length);
                                });
                            }
                            return tz;
                        }
                    },
                    {
                        token: 'iso(tz|timezone)',
                        format: function (d) {
                            return d.getUTCOffset(true);
                        }
                    },
                    {
                        token: 'ord',
                        format: function (d) {
                            var date = callDateGet(d, 'Date');
                            return date + getOrdinalizedSuffix(date);
                        }
                    }
                ];
            var DateUnits = [
                    {
                        unit: 'year',
                        method: 'FullYear',
                        ambiguous: true,
                        multiplier: function (d) {
                            var adjust = d ? d.isLeapYear() ? 1 : 0 : 0.25;
                            return (365 + adjust) * 24 * 60 * 60 * 1000;
                        }
                    },
                    {
                        unit: 'month',
                        method: 'Month',
                        ambiguous: true,
                        multiplier: function (d, ms) {
                            var days = 30.4375, inMonth;
                            if (d) {
                                inMonth = d.daysInMonth();
                                if (ms <= inMonth.days()) {
                                    days = inMonth;
                                }
                            }
                            return days * 24 * 60 * 60 * 1000;
                        },
                        error: 0.919
                    },
                    {
                        unit: 'week',
                        method: 'ISOWeek',
                        multiplier: function () {
                            return 7 * 24 * 60 * 60 * 1000;
                        }
                    },
                    {
                        unit: 'day',
                        method: 'Date',
                        ambiguous: true,
                        multiplier: function () {
                            return 24 * 60 * 60 * 1000;
                        }
                    },
                    {
                        unit: 'hour',
                        method: 'Hours',
                        multiplier: function () {
                            return 60 * 60 * 1000;
                        }
                    },
                    {
                        unit: 'minute',
                        method: 'Minutes',
                        multiplier: function () {
                            return 60 * 1000;
                        }
                    },
                    {
                        unit: 'second',
                        method: 'Seconds',
                        multiplier: function () {
                            return 1000;
                        }
                    },
                    {
                        unit: 'millisecond',
                        method: 'Milliseconds',
                        multiplier: function () {
                            return 1;
                        }
                    }
                ];
            var Localizations = {};
            function Localization(l) {
                simpleMerge(this, l);
                this.compiledFormats = CoreDateFormats.concat();
            }
            Localization.prototype = {
                getMonth: function (n) {
                    if (isNumber(n)) {
                        return n - 1;
                    } else {
                        return this['months'].indexOf(n) % 12;
                    }
                },
                getWeekday: function (n) {
                    return this['weekdays'].indexOf(n) % 7;
                },
                getNumber: function (n) {
                    var i;
                    if (isNumber(n)) {
                        return n;
                    } else if (n && (i = this['numbers'].indexOf(n)) !== -1) {
                        return (i + 1) % 10;
                    } else {
                        return 1;
                    }
                },
                getNumericDate: function (n) {
                    var self = this;
                    return n.replace(regexp(this['num'], 'g'), function (d) {
                        var num = self.getNumber(d);
                        return num || '';
                    });
                },
                getEnglishUnit: function (n) {
                    return English['units'][this['units'].indexOf(n) % 8];
                },
                getRelativeFormat: function (adu) {
                    return this.convertAdjustedToFormat(adu, adu[2] > 0 ? 'future' : 'past');
                },
                getDuration: function (ms) {
                    return this.convertAdjustedToFormat(getAdjustedUnit(ms), 'duration');
                },
                hasVariant: function (code) {
                    code = code || this.code;
                    return code === 'en' || code === 'en-US' ? true : this['variant'];
                },
                matchAM: function (str) {
                    return str === this['ampm'][0];
                },
                matchPM: function (str) {
                    return str && str === this['ampm'][1];
                },
                convertAdjustedToFormat: function (adu, mode) {
                    var sign, unit, mult, num = adu[0], u = adu[1], ms = adu[2], format = this[mode] || this['relative'];
                    if (isFunction(format)) {
                        return format.call(this, num, u, ms, mode);
                    }
                    mult = this['plural'] && num > 1 ? 1 : 0;
                    unit = this['units'][mult * 8 + u] || this['units'][u];
                    if (this['capitalizeUnit'])
                        unit = simpleCapitalize(unit);
                    sign = this['modifiers'].filter(function (m) {
                        return m.name == 'sign' && m.value == (ms > 0 ? 1 : -1);
                    })[0];
                    return format.replace(/\{(.*?)\}/g, function (full, match) {
                        switch (match) {
                        case 'num':
                            return num;
                        case 'unit':
                            return unit;
                        case 'sign':
                            return sign.src;
                        }
                    });
                },
                getFormats: function () {
                    return this.cachedFormat ? [this.cachedFormat].concat(this.compiledFormats) : this.compiledFormats;
                },
                addFormat: function (src, allowsTime, match, variant, iso) {
                    var to = match || [], loc = this, time, timeMarkers, lastIsNumeral;
                    src = src.replace(/\s+/g, '[-,. ]*');
                    src = src.replace(/\{([^,]+?)\}/g, function (all, k) {
                        var value, arr, result, opt = k.match(/\?$/), nc = k.match(/^(\d+)\??$/), slice = k.match(/(\d)(?:-(\d))?/), key = k.replace(/[^a-z]+$/, '');
                        if (nc) {
                            value = loc['tokens'][nc[1]];
                        } else if (loc[key]) {
                            value = loc[key];
                        } else if (loc[key + 's']) {
                            value = loc[key + 's'];
                            if (slice) {
                                arr = [];
                                value.forEach(function (m, i) {
                                    var mod = i % (loc['units'] ? 8 : value.length);
                                    if (mod >= slice[1] && mod <= (slice[2] || slice[1])) {
                                        arr.push(m);
                                    }
                                });
                                value = arr;
                            }
                            value = arrayToAlternates(value);
                        }
                        if (nc) {
                            result = '(?:' + value + ')';
                        } else {
                            if (!match) {
                                to.push(key);
                            }
                            result = '(' + value + ')';
                        }
                        if (opt) {
                            result += '?';
                        }
                        return result;
                    });
                    if (allowsTime) {
                        time = prepareTime(RequiredTime, loc, iso);
                        timeMarkers = [
                            't',
                            '[\\s\\u3000]'
                        ].concat(loc['timeMarker']);
                        lastIsNumeral = src.match(/\\d\{\d,\d\}\)+\??$/);
                        addDateInputFormat(loc, '(?:' + time + ')[,\\s\\u3000]+?' + src, TimeFormat.concat(to), variant);
                        addDateInputFormat(loc, src + '(?:[,\\s]*(?:' + timeMarkers.join('|') + (lastIsNumeral ? '+' : '*') + ')' + time + ')?', to.concat(TimeFormat), variant);
                    } else {
                        addDateInputFormat(loc, src, to, variant);
                    }
                }
            };
            function getLocalization(localeCode, fallback) {
                var loc;
                if (!isString(localeCode))
                    localeCode = '';
                loc = Localizations[localeCode] || Localizations[localeCode.slice(0, 2)];
                if (fallback === false && !loc) {
                    throw new Error('Invalid locale.');
                }
                return loc || CurrentLocalization;
            }
            function setLocalization(localeCode, set) {
                var loc, canAbbreviate;
                function initializeField(name) {
                    var val = loc[name];
                    if (isString(val)) {
                        loc[name] = val.split(',');
                    } else if (!val) {
                        loc[name] = [];
                    }
                }
                function eachAlternate(str, fn) {
                    str = str.split('+').map(function (split) {
                        return split.replace(/(.+):(.+)$/, function (full, base, suffixes) {
                            return suffixes.split('|').map(function (suffix) {
                                return base + suffix;
                            }).join('|');
                        });
                    }).join('|');
                    return str.split('|').forEach(fn);
                }
                function setArray(name, abbreviate, multiple) {
                    var arr = [];
                    loc[name].forEach(function (full, i) {
                        if (abbreviate) {
                            full += '+' + full.slice(0, 3);
                        }
                        eachAlternate(full, function (day, j) {
                            arr[j * multiple + i] = day.toLowerCase();
                        });
                    });
                    loc[name] = arr;
                }
                function getDigit(start, stop, allowNumbers) {
                    var str = '\\d{' + start + ',' + stop + '}';
                    if (allowNumbers)
                        str += '|(?:' + arrayToAlternates(loc['numbers']) + ')+';
                    return str;
                }
                function getNum() {
                    var arr = ['\\d+'].concat(loc['articles']);
                    if (loc['numbers'])
                        arr = arr.concat(loc['numbers']);
                    return arrayToAlternates(arr);
                }
                function setDefault(name, value) {
                    loc[name] = loc[name] || value;
                }
                function setModifiers() {
                    var arr = [];
                    loc.modifiersByName = {};
                    loc['modifiers'].forEach(function (modifier) {
                        var name = modifier.name;
                        eachAlternate(modifier.src, function (t) {
                            var locEntry = loc[name];
                            loc.modifiersByName[t] = modifier;
                            arr.push({
                                name: name,
                                src: t,
                                value: modifier.value
                            });
                            loc[name] = locEntry ? locEntry + '|' + t : t;
                        });
                    });
                    loc['day'] += '|' + arrayToAlternates(loc['weekdays']);
                    loc['modifiers'] = arr;
                }
                loc = new Localization(set);
                initializeField('modifiers');
                'months,weekdays,units,numbers,articles,tokens,timeMarker,ampm,timeSuffixes,dateParse,timeParse'.split(',').forEach(initializeField);
                canAbbreviate = !loc['monthSuffix'];
                setArray('months', canAbbreviate, 12);
                setArray('weekdays', canAbbreviate, 7);
                setArray('units', false, 8);
                setArray('numbers', false, 10);
                setDefault('code', localeCode);
                setDefault('date', getDigit(1, 2, loc['digitDate']));
                setDefault('year', '\'\\d{2}|' + getDigit(4, 4));
                setDefault('num', getNum());
                setModifiers();
                if (loc['monthSuffix']) {
                    loc['month'] = getDigit(1, 2);
                    loc['months'] = getRange(1, 12).map(function (n) {
                        return n + loc['monthSuffix'];
                    });
                }
                loc['full_month'] = getDigit(1, 2) + '|' + arrayToAlternates(loc['months']);
                if (loc['timeSuffixes'].length > 0) {
                    loc.addFormat(prepareTime(RequiredTime, loc), false, TimeFormat);
                }
                loc.addFormat('{day}', true);
                loc.addFormat('{month}' + (loc['monthSuffix'] || ''));
                loc.addFormat('{year}' + (loc['yearSuffix'] || ''));
                loc['timeParse'].forEach(function (src) {
                    loc.addFormat(src, true);
                });
                loc['dateParse'].forEach(function (src) {
                    loc.addFormat(src);
                });
                return Localizations[localeCode] = loc;
            }
            function addDateInputFormat(locale, format, match, variant) {
                locale.compiledFormats.unshift({
                    variant: variant,
                    locale: locale,
                    reg: regexp('^' + format + '$', 'i'),
                    to: match
                });
            }
            function simpleCapitalize(str) {
                return str.slice(0, 1).toUpperCase() + str.slice(1);
            }
            function arrayToAlternates(arr) {
                return arr.filter(function (el) {
                    return !!el;
                }).join('|');
            }
            function collectDateArguments(args, allowDuration) {
                var obj, arr;
                if (isObject(args[0])) {
                    return args;
                } else if (isNumber(args[0]) && !isNumber(args[1])) {
                    return [args[0]];
                } else if (isString(args[0]) && allowDuration) {
                    return [
                        getDateParamsFromString(args[0]),
                        args[1]
                    ];
                }
                obj = {};
                DateArgumentUnits.forEach(function (u, i) {
                    obj[u.unit] = args[i];
                });
                return [obj];
            }
            function getDateParamsFromString(str, num) {
                var params = {};
                match = str.match(/^(\d+)?\s?(\w+?)s?$/i);
                if (match) {
                    if (isUndefined(num)) {
                        num = parseInt(match[1]) || 1;
                    }
                    params[match[2].toLowerCase()] = num;
                }
                return params;
            }
            function getFormatMatch(match, arr) {
                var obj = {}, value, num;
                arr.forEach(function (key, i) {
                    value = match[i + 1];
                    if (isUndefined(value) || value === '')
                        return;
                    if (key === 'year') {
                        obj.yearAsString = value.replace(/'/, '');
                    }
                    num = parseFloat(value.replace(/'/, '').replace(/,/, '.'));
                    obj[key] = !isNaN(num) ? num : value.toLowerCase();
                });
                return obj;
            }
            function cleanDateInput(str) {
                str = str.trim().replace(/^just (?=now)|\.+$/i, '');
                return convertAsianDigits(str);
            }
            function convertAsianDigits(str) {
                return str.replace(AsianDigitReg, function (full, disallowed, match) {
                    var sum = 0, place = 1, lastWasHolder, lastHolder;
                    if (disallowed)
                        return full;
                    match.split('').reverse().forEach(function (letter) {
                        var value = AsianDigitMap[letter], holder = value > 9;
                        if (holder) {
                            if (lastWasHolder)
                                sum += place;
                            place *= value / (lastHolder || 1);
                            lastHolder = value;
                        } else {
                            if (lastWasHolder === false) {
                                place *= 10;
                            }
                            sum += place * value;
                        }
                        lastWasHolder = holder;
                    });
                    if (lastWasHolder)
                        sum += place;
                    return sum;
                });
            }
            function getExtendedDate(f, localeCode, prefer, forceUTC) {
                var d = new date(), relative = false, baseLocalization, loc, format, set, unit, weekday, num, tmp, after;
                d.utc(forceUTC);
                if (isDate(f)) {
                    d.utc(f.isUTC()).setTime(f.getTime());
                } else if (isNumber(f)) {
                    d.setTime(f);
                } else if (isObject(f)) {
                    d.set(f, true);
                    set = f;
                } else if (isString(f)) {
                    baseLocalization = getLocalization(localeCode);
                    f = cleanDateInput(f);
                    if (baseLocalization) {
                        iterateOverObject(baseLocalization.getFormats(), function (i, dif) {
                            var match = f.match(dif.reg);
                            if (match) {
                                format = dif;
                                loc = format.locale;
                                set = getFormatMatch(match, format.to, loc);
                                if (set['utc']) {
                                    d.utc();
                                }
                                loc.cachedFormat = format;
                                if (set.timestamp) {
                                    set = set.timestamp;
                                    return false;
                                }
                                if (format.variant && !isString(set['month']) && (isString(set['date']) || baseLocalization.hasVariant(localeCode))) {
                                    tmp = set['month'];
                                    set['month'] = set['date'];
                                    set['date'] = tmp;
                                }
                                if (set['year'] && set.yearAsString.length === 2) {
                                    set['year'] = getYearFromAbbreviation(set['year']);
                                }
                                if (set['month']) {
                                    set['month'] = loc.getMonth(set['month']);
                                    if (set['shift'] && !set['unit'])
                                        set['unit'] = loc['units'][7];
                                }
                                if (set['weekday'] && set['date']) {
                                    delete set['weekday'];
                                } else if (set['weekday']) {
                                    set['weekday'] = loc.getWeekday(set['weekday']);
                                    if (set['shift'] && !set['unit'])
                                        set['unit'] = loc['units'][5];
                                }
                                if (set['day'] && (tmp = loc.modifiersByName[set['day']])) {
                                    set['day'] = tmp.value;
                                    d.reset();
                                    relative = true;
                                } else if (set['day'] && (weekday = loc.getWeekday(set['day'])) > -1) {
                                    delete set['day'];
                                    if (set['num'] && set['month']) {
                                        after = function () {
                                            var w = d.getWeekday();
                                            d.setWeekday(7 * (set['num'] - 1) + (w > weekday ? weekday + 7 : weekday));
                                        };
                                        set['day'] = 1;
                                    } else {
                                        set['weekday'] = weekday;
                                    }
                                }
                                if (set['date'] && !isNumber(set['date'])) {
                                    set['date'] = loc.getNumericDate(set['date']);
                                }
                                if (loc.matchPM(set['ampm']) && set['hour'] < 12) {
                                    set['hour'] += 12;
                                } else if (loc.matchAM(set['ampm']) && set['hour'] === 12) {
                                    set['hour'] = 0;
                                }
                                if ('offset_hours' in set || 'offset_minutes' in set) {
                                    d.utc();
                                    set['offset_minutes'] = set['offset_minutes'] || 0;
                                    set['offset_minutes'] += set['offset_hours'] * 60;
                                    if (set['offset_sign'] === '-') {
                                        set['offset_minutes'] *= -1;
                                    }
                                    set['minute'] -= set['offset_minutes'];
                                }
                                if (set['unit']) {
                                    relative = true;
                                    num = loc.getNumber(set['num']);
                                    unit = loc.getEnglishUnit(set['unit']);
                                    if (set['shift'] || set['edge']) {
                                        num *= (tmp = loc.modifiersByName[set['shift']]) ? tmp.value : 0;
                                        if (unit === 'month' && isDefined(set['date'])) {
                                            d.set({ 'day': set['date'] }, true);
                                            delete set['date'];
                                        }
                                        if (unit === 'year' && isDefined(set['month'])) {
                                            d.set({
                                                'month': set['month'],
                                                'day': set['date']
                                            }, true);
                                            delete set['month'];
                                            delete set['date'];
                                        }
                                    }
                                    if (set['sign'] && (tmp = loc.modifiersByName[set['sign']])) {
                                        num *= tmp.value;
                                    }
                                    if (isDefined(set['weekday'])) {
                                        d.set({ 'weekday': set['weekday'] }, true);
                                        delete set['weekday'];
                                    }
                                    set[unit] = (set[unit] || 0) + num;
                                }
                                if (set['year_sign'] === '-') {
                                    set['year'] *= -1;
                                }
                                DateUnitsReversed.slice(1, 4).forEach(function (u, i) {
                                    var value = set[u.unit], fraction = value % 1;
                                    if (fraction) {
                                        set[DateUnitsReversed[i].unit] = round(fraction * (u.unit === 'second' ? 1000 : 60));
                                        set[u.unit] = floor(value);
                                    }
                                });
                                return false;
                            }
                        });
                    }
                    if (!format) {
                        if (f !== 'now') {
                            d = new date(f);
                        }
                        if (forceUTC) {
                            d.addMinutes(-d.getTimezoneOffset());
                        }
                    } else if (relative) {
                        d.advance(set);
                    } else {
                        if (d._utc) {
                            d.reset();
                        }
                        updateDate(d, set, true, false, prefer);
                    }
                    if (set && set['edge']) {
                        tmp = loc.modifiersByName[set['edge']];
                        iterateOverObject(DateUnitsReversed.slice(4), function (i, u) {
                            if (isDefined(set[u.unit])) {
                                unit = u.unit;
                                return false;
                            }
                        });
                        if (unit === 'year')
                            set.specificity = 'month';
                        else if (unit === 'month' || unit === 'week')
                            set.specificity = 'day';
                        d[(tmp.value < 0 ? 'endOf' : 'beginningOf') + simpleCapitalize(unit)]();
                        if (tmp.value === -2)
                            d.reset();
                    }
                    if (after) {
                        after();
                    }
                    d.utc(false);
                }
                return {
                    date: d,
                    set: set
                };
            }
            function getYearFromAbbreviation(year) {
                return round(callDateGet(new date(), 'FullYear') / 100) * 100 - round(year / 100) * 100 + year;
            }
            function getShortHour(d) {
                var hours = callDateGet(d, 'Hours');
                return hours === 0 ? 12 : hours - floor(hours / 13) * 12;
            }
            function getWeekNumber(date) {
                date = date.clone();
                var dow = callDateGet(date, 'Day') || 7;
                date.addDays(4 - dow).reset();
                return 1 + floor(date.daysSince(date.clone().beginningOfYear()) / 7);
            }
            function getAdjustedUnit(ms) {
                var next, ams = math.abs(ms), value = ams, unit = 0;
                DateUnitsReversed.slice(1).forEach(function (u, i) {
                    next = floor(round(ams / u.multiplier() * 10) / 10);
                    if (next >= 1) {
                        value = next;
                        unit = i + 1;
                    }
                });
                return [
                    value,
                    unit,
                    ms
                ];
            }
            function getAdjustedUnitWithMonthFallback(date) {
                var adu = getAdjustedUnit(date.millisecondsFromNow());
                if (adu[1] === 6) {
                    adu[0] = math.abs(date.monthsFromNow());
                }
                return adu;
            }
            function formatDate(date, format, relative, localeCode) {
                var adu, loc = getLocalization(localeCode), caps = regexp(/^[A-Z]/), value, shortcut;
                if (!date.isValid()) {
                    return 'Invalid Date';
                } else if (Date[format]) {
                    format = Date[format];
                } else if (isFunction(format)) {
                    adu = getAdjustedUnitWithMonthFallback(date);
                    format = format.apply(date, adu.concat(loc));
                }
                if (!format && relative) {
                    adu = adu || getAdjustedUnitWithMonthFallback(date);
                    if (adu[1] === 0) {
                        adu[1] = 1;
                        adu[0] = 1;
                    }
                    return loc.getRelativeFormat(adu);
                }
                format = format || 'long';
                format = loc[format] || format;
                DateOutputFormats.forEach(function (dof) {
                    format = format.replace(regexp('\\{(' + dof.token + ')(\\d)?\\}', dof.word ? 'i' : ''), function (m, t, d) {
                        var val = dof.format(date, loc, d || 1, t), l = t.length, one = t.match(/^(.)\1+$/);
                        if (dof.word) {
                            if (l === 3)
                                val = val.slice(0, 3);
                            if (one || t.match(caps))
                                val = simpleCapitalize(val);
                        } else if (one && !dof.text) {
                            val = (isNumber(val) ? padNumber(val, l) : val.toString()).slice(-l);
                        }
                        return val;
                    });
                });
                return format;
            }
            function compareDate(d, find, buffer, forceUTC) {
                var p, t, min, max, minOffset, maxOffset, override, capitalized, accuracy = 0, loBuffer = 0, hiBuffer = 0;
                p = getExtendedDate(find, null, null, forceUTC);
                if (buffer > 0) {
                    loBuffer = hiBuffer = buffer;
                    override = true;
                }
                if (!p.date.isValid())
                    return false;
                if (p.set && p.set.specificity) {
                    DateUnits.forEach(function (u, i) {
                        if (u.unit === p.set.specificity) {
                            accuracy = u.multiplier(p.date, d - p.date) - 1;
                        }
                    });
                    capitalized = simpleCapitalize(p.set.specificity);
                    if (p.set['edge'] || p.set['shift']) {
                        p.date['beginningOf' + capitalized]();
                    }
                    if (p.set.specificity === 'month') {
                        max = p.date.clone()['endOf' + capitalized]().getTime();
                    }
                    if (!override && p.set['sign'] && p.set.specificity != 'millisecond') {
                        loBuffer = 50;
                        hiBuffer = -50;
                    }
                }
                t = d.getTime();
                min = p.date.getTime();
                max = max || min + accuracy;
                max = compensateForTimezoneTraversal(d, min, max);
                return t >= min - loBuffer && t <= max + hiBuffer;
            }
            function compensateForTimezoneTraversal(d, min, max) {
                var dMin, dMax, minOffset, maxOffset;
                dMin = new Date(min);
                dMax = new Date(max).utc(d.isUTC());
                if (callDateGet(dMax, 'Hours') !== 23) {
                    minOffset = dMin.getTimezoneOffset();
                    maxOffset = dMax.getTimezoneOffset();
                    if (minOffset !== maxOffset) {
                        max += (maxOffset - minOffset).minutes();
                    }
                }
                return max;
            }
            function updateDate(d, params, reset, advance, prefer) {
                var weekday, specificityIndex;
                function getParam(key) {
                    return isDefined(params[key]) ? params[key] : params[key + 's'];
                }
                function paramExists(key) {
                    return isDefined(getParam(key));
                }
                function uniqueParamExists(key, isDay) {
                    return paramExists(key) || isDay && paramExists('weekday');
                }
                function canDisambiguate() {
                    var now = new date();
                    return prefer === -1 && d > now || prefer === 1 && d < now;
                }
                if (isNumber(params) && advance) {
                    params = { 'milliseconds': params };
                } else if (isNumber(params)) {
                    d.setTime(params);
                    return d;
                }
                if (isDefined(params['date'])) {
                    params['day'] = params['date'];
                }
                iterateOverObject(DateUnitsReversed, function (i, u) {
                    var isDay = u.unit === 'day';
                    if (uniqueParamExists(u.unit, isDay)) {
                        params.specificity = u.unit;
                        specificityIndex = +i;
                        return false;
                    } else if (reset && u.unit !== 'week' && (!isDay || !paramExists('week'))) {
                        callDateSet(d, u.method, isDay ? 1 : 0);
                    }
                });
                DateUnits.forEach(function (u, i) {
                    var unit = u.unit, method = u.method, higherUnit = DateUnits[i - 1], value;
                    value = getParam(unit);
                    if (isUndefined(value))
                        return;
                    if (advance) {
                        if (unit === 'week') {
                            value = (params['day'] || 0) + value * 7;
                            method = 'Date';
                        }
                        value = value * advance + callDateGet(d, method);
                    } else if (unit === 'month' && paramExists('day')) {
                        callDateSet(d, 'Date', 15);
                    }
                    callDateSet(d, method, value);
                    if (advance && unit === 'month') {
                        checkMonthTraversal(d, value);
                    }
                });
                if (!advance && !paramExists('day') && paramExists('weekday')) {
                    var weekday = getParam('weekday'), isAhead, futurePreferred;
                    d.setWeekday(weekday);
                }
                if (canDisambiguate()) {
                    iterateOverObject(DateUnitsReversed.slice(specificityIndex + 1), function (i, u) {
                        var ambiguous = u.ambiguous || u.unit === 'week' && paramExists('weekday');
                        if (ambiguous && !uniqueParamExists(u.unit, u.unit === 'day')) {
                            d[u.addMethod](prefer);
                            return false;
                        }
                    });
                }
                return d;
            }
            function callDateGet(d, method) {
                return d['get' + (d._utc ? 'UTC' : '') + method]();
            }
            function callDateSet(d, method, value) {
                return d['set' + (d._utc && method != 'ISOWeek' ? 'UTC' : '') + method](value);
            }
            function prepareTime(format, loc, iso) {
                var timeSuffixMapping = {
                        'h': 0,
                        'm': 1,
                        's': 2
                    }, add;
                loc = loc || English;
                return format.replace(/{([a-z])}/g, function (full, token) {
                    var separators = [], isHours = token === 'h', tokenIsRequired = isHours && !iso;
                    if (token === 't') {
                        return loc['ampm'].join('|');
                    } else {
                        if (isHours) {
                            separators.push(':');
                        }
                        if (add = loc['timeSuffixes'][timeSuffixMapping[token]]) {
                            separators.push(add + '\\s*');
                        }
                        return separators.length === 0 ? '' : '(?:' + separators.join('|') + ')' + (tokenIsRequired ? '' : '?');
                    }
                });
            }
            function checkMonthTraversal(date, targetMonth) {
                if (targetMonth < 0) {
                    targetMonth = targetMonth % 12 + 12;
                }
                if (targetMonth % 12 != callDateGet(date, 'Month')) {
                    callDateSet(date, 'Date', 0);
                }
            }
            function createDate(args, prefer, forceUTC) {
                var f, localeCode;
                if (isNumber(args[1])) {
                    f = collectDateArguments(args)[0];
                } else {
                    f = args[0];
                    localeCode = args[1];
                }
                return getExtendedDate(f, localeCode, prefer, forceUTC).date;
            }
            function buildDateUnits() {
                DateUnitsReversed = DateUnits.concat().reverse();
                DateArgumentUnits = DateUnits.concat();
                DateArgumentUnits.splice(2, 1);
            }
            function buildDateMethods() {
                extendSimilar(date, true, false, DateUnits, function (methods, u, i) {
                    var unit = u.unit, caps = simpleCapitalize(unit), multiplier = u.multiplier(), since, until;
                    u.addMethod = 'add' + caps + 's';
                    function applyErrorMargin(ms) {
                        var num = ms / multiplier, fraction = num % 1, error = u.error || 0.999;
                        if (fraction && math.abs(fraction % 1) > error) {
                            num = round(num);
                        }
                        return parseInt(num);
                    }
                    since = function (f, localeCode) {
                        return applyErrorMargin(this.getTime() - date.create(f, localeCode).getTime());
                    };
                    until = function (f, localeCode) {
                        return applyErrorMargin(date.create(f, localeCode).getTime() - this.getTime());
                    };
                    methods[unit + 'sAgo'] = until;
                    methods[unit + 'sUntil'] = until;
                    methods[unit + 'sSince'] = since;
                    methods[unit + 'sFromNow'] = since;
                    methods[u.addMethod] = function (num, reset) {
                        var set = {};
                        set[unit] = num;
                        return this.advance(set, reset);
                    };
                    buildNumberToDateAlias(u, multiplier);
                    if (i < 3) {
                        [
                            'Last',
                            'This',
                            'Next'
                        ].forEach(function (shift) {
                            methods['is' + shift + caps] = function () {
                                return this.is(shift + ' ' + unit);
                            };
                        });
                    }
                    if (i < 4) {
                        methods['beginningOf' + caps] = function () {
                            var set = {};
                            switch (unit) {
                            case 'year':
                                set['year'] = callDateGet(this, 'FullYear');
                                break;
                            case 'month':
                                set['month'] = callDateGet(this, 'Month');
                                break;
                            case 'day':
                                set['day'] = callDateGet(this, 'Date');
                                break;
                            case 'week':
                                set['weekday'] = 0;
                                break;
                            }
                            return this.set(set, true);
                        };
                        methods['endOf' + caps] = function () {
                            var set = {
                                    'hours': 23,
                                    'minutes': 59,
                                    'seconds': 59,
                                    'milliseconds': 999
                                };
                            switch (unit) {
                            case 'year':
                                set['month'] = 11;
                                set['day'] = 31;
                                break;
                            case 'month':
                                set['day'] = this.daysInMonth();
                                break;
                            case 'week':
                                set['weekday'] = 6;
                                break;
                            }
                            return this.set(set, true);
                        };
                    }
                });
            }
            function buildCoreInputFormats() {
                English.addFormat('([+-])?(\\d{4,4})[-.]?{full_month}[-.]?(\\d{1,2})?', true, [
                    'year_sign',
                    'year',
                    'month',
                    'date'
                ], false, true);
                English.addFormat('(\\d{1,2})[-.\\/]{full_month}(?:[-.\\/](\\d{2,4}))?', true, [
                    'date',
                    'month',
                    'year'
                ], true);
                English.addFormat('{full_month}[-.](\\d{4,4})', false, [
                    'month',
                    'year'
                ]);
                English.addFormat('\\/Date\\((\\d+(?:\\+\\d{4,4})?)\\)\\/', false, ['timestamp']);
                English.addFormat(prepareTime(RequiredTime, English), false, TimeFormat);
                CoreDateFormats = English.compiledFormats.slice(0, 7).reverse();
                English.compiledFormats = English.compiledFormats.slice(7).concat(CoreDateFormats);
            }
            function buildDateOutputShortcuts() {
                extendSimilar(date, true, false, 'short,long,full', function (methods, name) {
                    methods[name] = function (localeCode) {
                        return formatDate(this, name, false, localeCode);
                    };
                });
            }
            function buildAsianDigits() {
                KanjiDigits.split('').forEach(function (digit, value) {
                    var holder;
                    if (value > 9) {
                        value = math.pow(10, value - 9);
                    }
                    AsianDigitMap[digit] = value;
                });
                FullWidthDigits.split('').forEach(function (digit, value) {
                    AsianDigitMap[digit] = value;
                });
                AsianDigitReg = regexp('([\u671f\u9031\u5468])?([' + KanjiDigits + FullWidthDigits + ']+)(?!\u6628)', 'g');
            }
            function buildRelativeAliases() {
                var special = 'today,yesterday,tomorrow,weekday,weekend,future,past'.split(',');
                var weekdays = English['weekdays'].slice(0, 7);
                var months = English['months'].slice(0, 12);
                extendSimilar(date, true, false, special.concat(weekdays).concat(months), function (methods, name) {
                    methods['is' + simpleCapitalize(name)] = function (utc) {
                        return this.is(name, 0, utc);
                    };
                });
            }
            function buildUTCAliases() {
                date.extend({
                    'utc': {
                        'create': function () {
                            return createDate(arguments, 0, true);
                        },
                        'past': function () {
                            return createDate(arguments, -1, true);
                        },
                        'future': function () {
                            return createDate(arguments, 1, true);
                        }
                    }
                }, false, false);
            }
            function setDateProperties() {
                date.extend({
                    'RFC1123': '{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {tz}',
                    'RFC1036': '{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {tz}',
                    'ISO8601_DATE': '{yyyy}-{MM}-{dd}',
                    'ISO8601_DATETIME': '{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{fff}{isotz}'
                }, false, false);
            }
            date.extend({
                'create': function () {
                    return createDate(arguments);
                },
                'past': function () {
                    return createDate(arguments, -1);
                },
                'future': function () {
                    return createDate(arguments, 1);
                },
                'addLocale': function (localeCode, set) {
                    return setLocalization(localeCode, set);
                },
                'setLocale': function (localeCode, set) {
                    var loc = getLocalization(localeCode, false);
                    CurrentLocalization = loc;
                    if (localeCode && localeCode != loc['code']) {
                        loc['code'] = localeCode;
                    }
                    return loc;
                },
                'getLocale': function (localeCode) {
                    return !localeCode ? CurrentLocalization : getLocalization(localeCode, false);
                },
                'addFormat': function (format, match, localeCode) {
                    addDateInputFormat(getLocalization(localeCode), format, match);
                }
            }, false, false);
            date.extend({
                'set': function () {
                    var args = collectDateArguments(arguments);
                    return updateDate(this, args[0], args[1]);
                },
                'setWeekday': function (dow) {
                    if (isUndefined(dow))
                        return;
                    return callDateSet(this, 'Date', callDateGet(this, 'Date') + dow - callDateGet(this, 'Day'));
                },
                'setISOWeek': function (week) {
                    var weekday = callDateGet(this, 'Day') || 7;
                    if (isUndefined(week))
                        return;
                    this.set({
                        'month': 0,
                        'date': 4
                    });
                    this.set({ 'weekday': 1 });
                    if (week > 1) {
                        this.addWeeks(week - 1);
                    }
                    if (weekday !== 1) {
                        this.advance({ 'days': weekday - 1 });
                    }
                    return this.getTime();
                },
                'getISOWeek': function () {
                    return getWeekNumber(this);
                },
                'getUTCOffset': function (iso) {
                    var offset = this._utc ? 0 : this.getTimezoneOffset();
                    var colon = iso === true ? ':' : '';
                    if (!offset && iso)
                        return 'Z';
                    return padNumber(round(-offset / 60), 2, true) + colon + padNumber(offset % 60, 2);
                },
                'utc': function (set) {
                    defineProperty(this, '_utc', set === true || arguments.length === 0);
                    return this;
                },
                'isUTC': function () {
                    return !!this._utc || this.getTimezoneOffset() === 0;
                },
                'advance': function () {
                    var args = collectDateArguments(arguments, true);
                    return updateDate(this, args[0], args[1], 1);
                },
                'rewind': function () {
                    var args = collectDateArguments(arguments, true);
                    return updateDate(this, args[0], args[1], -1);
                },
                'isValid': function () {
                    return !isNaN(this.getTime());
                },
                'isAfter': function (d, margin, utc) {
                    return this.getTime() > date.create(d).getTime() - (margin || 0);
                },
                'isBefore': function (d, margin) {
                    return this.getTime() < date.create(d).getTime() + (margin || 0);
                },
                'isBetween': function (d1, d2, margin) {
                    var t = this.getTime();
                    var t1 = date.create(d1).getTime();
                    var t2 = date.create(d2).getTime();
                    var lo = math.min(t1, t2);
                    var hi = math.max(t1, t2);
                    margin = margin || 0;
                    return lo - margin < t && hi + margin > t;
                },
                'isLeapYear': function () {
                    var year = callDateGet(this, 'FullYear');
                    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
                },
                'daysInMonth': function () {
                    return 32 - callDateGet(new date(callDateGet(this, 'FullYear'), callDateGet(this, 'Month'), 32), 'Date');
                },
                'format': function (f, localeCode) {
                    return formatDate(this, f, false, localeCode);
                },
                'relative': function (f, localeCode) {
                    if (isString(f)) {
                        localeCode = f;
                        f = null;
                    }
                    return formatDate(this, f, true, localeCode);
                },
                'is': function (d, margin, utc) {
                    var tmp, comp;
                    if (!this.isValid())
                        return;
                    if (isString(d)) {
                        d = d.trim().toLowerCase();
                        comp = this.clone().utc(utc);
                        switch (true) {
                        case d === 'future':
                            return this.getTime() > new date().getTime();
                        case d === 'past':
                            return this.getTime() < new date().getTime();
                        case d === 'weekday':
                            return callDateGet(comp, 'Day') > 0 && callDateGet(comp, 'Day') < 6;
                        case d === 'weekend':
                            return callDateGet(comp, 'Day') === 0 || callDateGet(comp, 'Day') === 6;
                        case (tmp = English['weekdays'].indexOf(d) % 7) > -1:
                            return callDateGet(comp, 'Day') === tmp;
                        case (tmp = English['months'].indexOf(d) % 12) > -1:
                            return callDateGet(comp, 'Month') === tmp;
                        }
                    }
                    return compareDate(this, d, margin, utc);
                },
                'reset': function (unit) {
                    var params = {}, recognized;
                    unit = unit || 'hours';
                    if (unit === 'date')
                        unit = 'days';
                    recognized = DateUnits.some(function (u) {
                        return unit === u.unit || unit === u.unit + 's';
                    });
                    params[unit] = unit.match(/^days?/) ? 1 : 0;
                    return recognized ? this.set(params, true) : this;
                },
                'clone': function () {
                    var d = new date(this.getTime());
                    d.utc(!!this._utc);
                    return d;
                }
            });
            date.extend({
                'iso': function () {
                    return this.toISOString();
                },
                'getWeekday': date.prototype.getDay,
                'getUTCWeekday': date.prototype.getUTCDay
            });
            function buildNumberToDateAlias(u, multiplier) {
                var unit = u.unit, methods = {};
                function base() {
                    return round(this * multiplier);
                }
                function after() {
                    return createDate(arguments)[u.addMethod](this);
                }
                function before() {
                    return createDate(arguments)[u.addMethod](-this);
                }
                methods[unit] = base;
                methods[unit + 's'] = base;
                methods[unit + 'Before'] = before;
                methods[unit + 'sBefore'] = before;
                methods[unit + 'Ago'] = before;
                methods[unit + 'sAgo'] = before;
                methods[unit + 'After'] = after;
                methods[unit + 'sAfter'] = after;
                methods[unit + 'FromNow'] = after;
                methods[unit + 'sFromNow'] = after;
                number.extend(methods);
            }
            number.extend({
                'duration': function (localeCode) {
                    return getLocalization(localeCode).getDuration(this);
                }
            });
            English = CurrentLocalization = date.addLocale('en', {
                'plural': true,
                'timeMarker': 'at',
                'ampm': 'am,pm',
                'months': 'January,February,March,April,May,June,July,August,September,October,November,December',
                'weekdays': 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
                'units': 'millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s',
                'numbers': 'one,two,three,four,five,six,seven,eight,nine,ten',
                'articles': 'a,an,the',
                'tokens': 'the,st|nd|rd|th,of',
                'short': '{Month} {d}, {yyyy}',
                'long': '{Month} {d}, {yyyy} {h}:{mm}{tt}',
                'full': '{Weekday} {Month} {d}, {yyyy} {h}:{mm}:{ss}{tt}',
                'past': '{num} {unit} {sign}',
                'future': '{num} {unit} {sign}',
                'duration': '{num} {unit}',
                'modifiers': [
                    {
                        'name': 'day',
                        'src': 'yesterday',
                        'value': -1
                    },
                    {
                        'name': 'day',
                        'src': 'today',
                        'value': 0
                    },
                    {
                        'name': 'day',
                        'src': 'tomorrow',
                        'value': 1
                    },
                    {
                        'name': 'sign',
                        'src': 'ago|before',
                        'value': -1
                    },
                    {
                        'name': 'sign',
                        'src': 'from now|after|from|in|later',
                        'value': 1
                    },
                    {
                        'name': 'edge',
                        'src': 'last day',
                        'value': -2
                    },
                    {
                        'name': 'edge',
                        'src': 'end',
                        'value': -1
                    },
                    {
                        'name': 'edge',
                        'src': 'first day|beginning',
                        'value': 1
                    },
                    {
                        'name': 'shift',
                        'src': 'last',
                        'value': -1
                    },
                    {
                        'name': 'shift',
                        'src': 'the|this',
                        'value': 0
                    },
                    {
                        'name': 'shift',
                        'src': 'next',
                        'value': 1
                    }
                ],
                'dateParse': [
                    '{num} {unit} {sign}',
                    '{sign} {num} {unit}',
                    '{month} {year}',
                    '{shift} {unit=5-7}',
                    '{0?} {date}{1}',
                    '{0?} {edge} of {shift?} {unit=4-7?}{month?}{year?}'
                ],
                'timeParse': [
                    '{0} {num}{1} {day} of {month} {year?}',
                    '{weekday?} {month} {date}{1?} {year?}',
                    '{date} {month} {year}',
                    '{date} {month}',
                    '{shift} {weekday}',
                    '{shift} week {weekday}',
                    '{weekday} {2?} {shift} week',
                    '{num} {unit=4-5} {sign} {day}',
                    '{0?} {date}{1} of {month}',
                    '{0?}{month?} {date?}{1?} of {shift} {unit=6-7}'
                ]
            });
            buildDateUnits();
            buildDateMethods();
            buildCoreInputFormats();
            buildDateOutputShortcuts();
            buildAsianDigits();
            buildRelativeAliases();
            buildUTCAliases();
            setDateProperties();
            var DateRange = function (start, end) {
                this.start = date.create(start);
                this.end = date.create(end);
            };
            DateRange.prototype.toString = function () {
                return this.isValid() ? this.start.full() + '..' + this.end.full() : 'Invalid DateRange';
            };
            extend(DateRange, true, false, {
                'isValid': function () {
                    return this.start < this.end;
                },
                'duration': function () {
                    return this.isValid() ? this.end.getTime() - this.start.getTime() : NaN;
                },
                'contains': function (obj) {
                    var self = this, arr = obj.start && obj.end ? [
                            obj.start,
                            obj.end
                        ] : [obj];
                    return arr.every(function (d) {
                        return d >= self.start && d <= self.end;
                    });
                },
                'every': function (increment, fn) {
                    var current = this.start.clone(), result = [], index = 0, params, isDay;
                    if (isString(increment)) {
                        current.advance(getDateParamsFromString(increment, 0), true);
                        params = getDateParamsFromString(increment);
                        isDay = increment.toLowerCase() === 'day';
                    } else {
                        params = { 'milliseconds': increment };
                    }
                    while (current <= this.end) {
                        result.push(current);
                        if (fn)
                            fn(current, index);
                        if (isDay && callDateGet(current, 'Hours') === 23) {
                            current = current.clone();
                            callDateSet(current, 'Hours', 48);
                        } else {
                            current = current.clone().advance(params, true);
                        }
                        index++;
                    }
                    return result;
                },
                'union': function (range) {
                    return new DateRange(this.start < range.start ? this.start : range.start, this.end > range.end ? this.end : range.end);
                },
                'intersect': function (range) {
                    return new DateRange(this.start > range.start ? this.start : range.start, this.end < range.end ? this.end : range.end);
                },
                'clone': function (range) {
                    return new DateRange(this.start, this.end);
                }
            });
            extendSimilar(DateRange, true, false, 'Millisecond,Second,Minute,Hour,Day,Week,Month,Year', function (methods, name) {
                methods['each' + name] = function (fn) {
                    return this.every(name, fn);
                };
            });
            extend(date, false, false, {
                'range': function (start, end) {
                    return new DateRange(start, end);
                }
            });
            function setDelay(fn, ms, after, scope, args) {
                var index;
                if (ms === Infinity)
                    return;
                if (!fn.timers)
                    fn.timers = [];
                if (!isNumber(ms))
                    ms = 0;
                fn.timers.push(setTimeout(function () {
                    fn.timers.splice(index, 1);
                    after.apply(scope, args || []);
                }, ms));
                index = fn.timers.length;
            }
            extend(Function, true, false, {
                'lazy': function (ms, limit) {
                    var fn = this, queue = [], lock = false, execute, rounded, perExecution, result;
                    ms = ms || 1;
                    limit = limit || Infinity;
                    rounded = ceil(ms);
                    perExecution = round(rounded / ms) || 1;
                    execute = function () {
                        if (lock || queue.length == 0)
                            return;
                        var max = math.max(queue.length - perExecution, 0);
                        while (queue.length > max) {
                            result = Function.prototype.apply.apply(fn, queue.shift());
                        }
                        setDelay(lazy, rounded, function () {
                            lock = false;
                            execute();
                        });
                        lock = true;
                    };
                    function lazy() {
                        if (!lock || queue.length < limit - 1) {
                            queue.push([
                                this,
                                arguments
                            ]);
                            execute();
                        }
                        return result;
                    }
                    return lazy;
                },
                'delay': function (ms) {
                    var fn = this;
                    var args = multiArgs(arguments).slice(1);
                    setDelay(fn, ms, fn, fn, args);
                    return fn;
                },
                'throttle': function (ms) {
                    return this.lazy(ms, 1);
                },
                'debounce': function (ms) {
                    var fn = this;
                    function debounced() {
                        debounced.cancel();
                        setDelay(debounced, ms, fn, this, arguments);
                    }
                    ;
                    return debounced;
                },
                'cancel': function () {
                    if (isArray(this.timers)) {
                        while (this.timers.length > 0) {
                            clearTimeout(this.timers.shift());
                        }
                    }
                    return this;
                },
                'after': function (num) {
                    var fn = this, counter = 0, storedArguments = [];
                    if (!isNumber(num)) {
                        num = 1;
                    } else if (num === 0) {
                        fn.call();
                        return fn;
                    }
                    return function () {
                        var ret;
                        storedArguments.push(multiArgs(arguments));
                        counter++;
                        if (counter == num) {
                            ret = fn.call(this, storedArguments);
                            counter = 0;
                            storedArguments = [];
                            return ret;
                        }
                    };
                },
                'once': function () {
                    return this.throttle(Infinity);
                },
                'fill': function () {
                    var fn = this, curried = multiArgs(arguments);
                    return function () {
                        var args = multiArgs(arguments);
                        curried.forEach(function (arg, index) {
                            if (arg != null || index >= args.length)
                                args.splice(index, 0, arg);
                        });
                        return fn.apply(this, args);
                    };
                }
            });
            function abbreviateNumber(num, roundTo, str, mid, limit, bytes) {
                var fixed = num.toFixed(20), decimalPlace = fixed.search(/\./), numeralPlace = fixed.search(/[1-9]/), significant = decimalPlace - numeralPlace, unit, i, divisor;
                if (significant > 0) {
                    significant -= 1;
                }
                i = math.max(math.min((significant / 3).floor(), limit === false ? str.length : limit), -mid);
                unit = str.charAt(i + mid - 1);
                if (significant < -9) {
                    i = -3;
                    roundTo = significant.abs() - 9;
                    unit = str.slice(0, 1);
                }
                divisor = bytes ? 2..pow(10 * i) : 10..pow(i * 3);
                return (num / divisor).round(roundTo || 0).format() + unit.trim();
            }
            extend(number, false, false, {
                'random': function (n1, n2) {
                    var min, max;
                    if (arguments.length == 1)
                        n2 = n1, n1 = 0;
                    min = math.min(n1 || 0, isUndefined(n2) ? 1 : n2);
                    max = math.max(n1 || 0, isUndefined(n2) ? 1 : n2) + 1;
                    return floor(math.random() * (max - min) + min);
                }
            });
            extend(number, true, false, {
                'log': function (base) {
                    return math.log(this) / (base ? math.log(base) : 1);
                },
                'abbr': function (precision) {
                    return abbreviateNumber(this, precision, 'kmbt', 0, 4);
                },
                'metric': function (precision, limit) {
                    return abbreviateNumber(this, precision, 'n\u03bcm kMGTPE', 4, isUndefined(limit) ? 1 : limit);
                },
                'bytes': function (precision, limit) {
                    return abbreviateNumber(this, precision, 'kMGTPE', 0, isUndefined(limit) ? 4 : limit, true) + 'B';
                },
                'isInteger': function () {
                    return this % 1 == 0;
                },
                'isOdd': function () {
                    return !isNaN(this) && !this.isMultipleOf(2);
                },
                'isEven': function () {
                    return this.isMultipleOf(2);
                },
                'isMultipleOf': function (num) {
                    return this % num === 0;
                },
                'format': function (place, thousands, decimal) {
                    var i, str, split, integer, fraction, result = '';
                    if (isUndefined(thousands)) {
                        thousands = ',';
                    }
                    if (isUndefined(decimal)) {
                        decimal = '.';
                    }
                    str = (isNumber(place) ? round(this, place || 0).toFixed(math.max(place, 0)) : this.toString()).replace(/^-/, '');
                    split = str.split('.');
                    integer = split[0];
                    fraction = split[1];
                    for (i = integer.length; i > 0; i -= 3) {
                        if (i < integer.length) {
                            result = thousands + result;
                        }
                        result = integer.slice(math.max(0, i - 3), i) + result;
                    }
                    if (fraction) {
                        result += decimal + repeatString((place || 0) - fraction.length, '0') + fraction;
                    }
                    return (this < 0 ? '-' : '') + result;
                },
                'hex': function (pad) {
                    return this.pad(pad || 1, false, 16);
                },
                'upto': function (num, fn, step) {
                    return getRange(this, num, fn, step || 1);
                },
                'downto': function (num, fn, step) {
                    return getRange(this, num, fn, -(step || 1));
                },
                'times': function (fn) {
                    if (fn) {
                        for (var i = 0; i < this; i++) {
                            fn.call(this, i);
                        }
                    }
                    return this.toNumber();
                },
                'chr': function () {
                    return string.fromCharCode(this);
                },
                'pad': function (place, sign, base) {
                    return padNumber(this, place, sign, base);
                },
                'ordinalize': function () {
                    var suffix, num = this.abs(), last = parseInt(num.toString().slice(-2));
                    return this + getOrdinalizedSuffix(last);
                },
                'toNumber': function () {
                    return parseFloat(this, 10);
                }
            });
            function buildNumber() {
                extendSimilar(number, true, false, 'round,floor,ceil', function (methods, name) {
                    methods[name] = function (precision) {
                        return round(this, precision, name);
                    };
                });
                extendSimilar(number, true, false, 'abs,pow,sin,asin,cos,acos,tan,atan,exp,pow,sqrt', function (methods, name) {
                    methods[name] = function (a, b) {
                        return math[name](this, a, b);
                    };
                });
            }
            buildNumber();
            var ObjectTypeMethods = 'isObject,isNaN'.split(',');
            var ObjectHashMethods = 'keys,values,select,reject,each,merge,clone,equal,watch,tap,has'.split(',');
            function setParamsObject(obj, param, value, deep) {
                var reg = /^(.+?)(\[.*\])$/, paramIsArray, match, allKeys, key;
                if (deep !== false && (match = param.match(reg))) {
                    key = match[1];
                    allKeys = match[2].replace(/^\[|\]$/g, '').split('][');
                    allKeys.forEach(function (k) {
                        paramIsArray = !k || k.match(/^\d+$/);
                        if (!key && isArray(obj))
                            key = obj.length;
                        if (!hasOwnProperty(obj, key)) {
                            obj[key] = paramIsArray ? [] : {};
                        }
                        obj = obj[key];
                        key = k;
                    });
                    if (!key && paramIsArray)
                        key = obj.length.toString();
                    setParamsObject(obj, key, value);
                } else if (value.match(/^[+-]?\d+(\.\d+)?$/)) {
                    obj[param] = parseFloat(value);
                } else if (value === 'true') {
                    obj[param] = true;
                } else if (value === 'false') {
                    obj[param] = false;
                } else {
                    obj[param] = value;
                }
            }
            function matchKey(key, match) {
                if (isRegExp(match)) {
                    return match.test(key);
                } else if (isObjectPrimitive(match)) {
                    return hasOwnProperty(match, key);
                } else {
                    return key === string(match);
                }
            }
            function selectFromObject(obj, args, select) {
                var result = {}, match;
                iterateOverObject(obj, function (key, value) {
                    match = false;
                    flattenedArgs(args, function (arg) {
                        if (matchKey(key, arg)) {
                            match = true;
                        }
                    }, 1);
                    if (match === select) {
                        result[key] = value;
                    }
                });
                return result;
            }
            function buildTypeMethods() {
                extendSimilar(object, false, false, ClassNames, function (methods, name) {
                    var method = 'is' + name;
                    ObjectTypeMethods.push(method);
                    methods[method] = typeChecks[name];
                });
            }
            function buildObjectExtend() {
                extend(object, false, function () {
                    return arguments.length === 0;
                }, {
                    'extend': function () {
                        var methods = ObjectTypeMethods.concat(ObjectHashMethods);
                        if (typeof EnumerableMethods !== 'undefined') {
                            methods = methods.concat(EnumerableMethods);
                        }
                        buildObjectInstanceMethods(methods, object);
                    }
                });
            }
            extend(object, false, true, {
                'watch': function (obj, prop, fn) {
                    if (!definePropertySupport)
                        return;
                    var value = obj[prop];
                    object.defineProperty(obj, prop, {
                        'enumerable': true,
                        'configurable': true,
                        'get': function () {
                            return value;
                        },
                        'set': function (to) {
                            value = fn.call(obj, prop, value, to);
                        }
                    });
                }
            });
            extend(object, false, function (arg1, arg2) {
                return isFunction(arg2);
            }, {
                'keys': function (obj, fn) {
                    var keys = object.keys(obj);
                    keys.forEach(function (key) {
                        fn.call(obj, key, obj[key]);
                    });
                    return keys;
                }
            });
            extend(object, false, false, {
                'isObject': function (obj) {
                    return isObject(obj);
                },
                'isNaN': function (obj) {
                    return isNumber(obj) && obj.valueOf() !== obj.valueOf();
                },
                'equal': function (a, b) {
                    return isEqual(a, b);
                },
                'extended': function (obj) {
                    return new Hash(obj);
                },
                'merge': function (target, source, deep, resolve) {
                    var key, val;
                    if (target && typeof source != 'string') {
                        for (key in source) {
                            if (!hasOwnProperty(source, key) || !target)
                                continue;
                            val = source[key];
                            if (isDefined(target[key])) {
                                if (resolve === false) {
                                    continue;
                                }
                                if (isFunction(resolve)) {
                                    val = resolve.call(source, key, target[key], source[key]);
                                }
                            }
                            if (deep === true && val && isObjectPrimitive(val)) {
                                if (isDate(val)) {
                                    val = new date(val.getTime());
                                } else if (isRegExp(val)) {
                                    val = new regexp(val.source, getRegExpFlags(val));
                                } else {
                                    if (!target[key])
                                        target[key] = array.isArray(val) ? [] : {};
                                    object.merge(target[key], source[key], deep, resolve);
                                    continue;
                                }
                            }
                            target[key] = val;
                        }
                    }
                    return target;
                },
                'values': function (obj, fn) {
                    var values = [];
                    iterateOverObject(obj, function (k, v) {
                        values.push(v);
                        if (fn)
                            fn.call(obj, v);
                    });
                    return values;
                },
                'clone': function (obj, deep) {
                    var target;
                    if (isDate(obj) && obj.clone) {
                        return obj.clone();
                    } else if (!isObjectPrimitive(obj)) {
                        return obj;
                    } else if (obj instanceof Hash) {
                        target = new Hash();
                    } else {
                        target = new obj.constructor();
                    }
                    return object.merge(target, obj, deep);
                },
                'fromQueryString': function (str, deep) {
                    var result = object.extended(), split;
                    str = str && str.toString ? str.toString() : '';
                    str.replace(/^.*?\?/, '').split('&').forEach(function (p) {
                        var split = p.split('=');
                        if (split.length !== 2)
                            return;
                        setParamsObject(result, split[0], decodeURIComponent(split[1]), deep);
                    });
                    return result;
                },
                'tap': function (obj, arg) {
                    var fn = arg;
                    if (!isFunction(arg)) {
                        fn = function () {
                            if (arg)
                                obj[arg]();
                        };
                    }
                    fn.call(obj, obj);
                    return obj;
                },
                'has': function (obj, key) {
                    return hasOwnProperty(obj, key);
                },
                'select': function (obj) {
                    return selectFromObject(obj, arguments, true);
                },
                'reject': function (obj) {
                    return selectFromObject(obj, arguments, false);
                }
            });
            buildTypeMethods();
            buildObjectExtend();
            buildObjectInstanceMethods(ObjectHashMethods, Hash);
            function uniqueRegExpFlags(flags) {
                return flags.split('').sort().join('').replace(/([gimy])\1+/g, '$1');
            }
            extend(regexp, false, false, {
                'escape': function (str) {
                    return escapeRegExp(str);
                }
            });
            extend(regexp, true, false, {
                'getFlags': function () {
                    return getRegExpFlags(this);
                },
                'setFlags': function (flags) {
                    return regexp(this.source, flags);
                },
                'addFlag': function (flag) {
                    return this.setFlags(getRegExpFlags(this, flag));
                },
                'removeFlag': function (flag) {
                    return this.setFlags(getRegExpFlags(this).replace(flag, ''));
                }
            });
            function getAcronym(word) {
                var inflector = string.Inflector;
                var word = inflector && inflector.acronyms[word];
                if (isString(word)) {
                    return word;
                }
            }
            function padString(str, p, left, right) {
                var padding = string(p);
                if (padding != p) {
                    padding = '';
                }
                if (!isNumber(left))
                    left = 1;
                if (!isNumber(right))
                    right = 1;
                return padding.repeat(left) + str + padding.repeat(right);
            }
            function chr(num) {
                return string.fromCharCode(num);
            }
            var btoa, atob;
            function buildBase64(key) {
                if (this.btoa) {
                    btoa = this.btoa;
                    atob = this.atob;
                    return;
                }
                var base64reg = /[^A-Za-z0-9\+\/\=]/g;
                btoa = function (str) {
                    var output = '';
                    var chr1, chr2, chr3;
                    var enc1, enc2, enc3, enc4;
                    var i = 0;
                    do {
                        chr1 = str.charCodeAt(i++);
                        chr2 = str.charCodeAt(i++);
                        chr3 = str.charCodeAt(i++);
                        enc1 = chr1 >> 2;
                        enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                        enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                        enc4 = chr3 & 63;
                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }
                        output = output + key.charAt(enc1) + key.charAt(enc2) + key.charAt(enc3) + key.charAt(enc4);
                        chr1 = chr2 = chr3 = '';
                        enc1 = enc2 = enc3 = enc4 = '';
                    } while (i < str.length);
                    return output;
                };
                atob = function (input) {
                    var output = '';
                    var chr1, chr2, chr3;
                    var enc1, enc2, enc3, enc4;
                    var i = 0;
                    if (input.match(base64reg)) {
                        throw new Error('String contains invalid base64 characters');
                    }
                    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
                    do {
                        enc1 = key.indexOf(input.charAt(i++));
                        enc2 = key.indexOf(input.charAt(i++));
                        enc3 = key.indexOf(input.charAt(i++));
                        enc4 = key.indexOf(input.charAt(i++));
                        chr1 = enc1 << 2 | enc2 >> 4;
                        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
                        chr3 = (enc3 & 3) << 6 | enc4;
                        output = output + chr(chr1);
                        if (enc3 != 64) {
                            output = output + chr(chr2);
                        }
                        if (enc4 != 64) {
                            output = output + chr(chr3);
                        }
                        chr1 = chr2 = chr3 = '';
                        enc1 = enc2 = enc3 = enc4 = '';
                    } while (i < input.length);
                    return output;
                };
            }
            extend(string, true, function (reg) {
                return isRegExp(reg) || arguments.length > 2;
            }, {
                'startsWith': function (reg, pos, c) {
                    var str = this, source;
                    if (pos)
                        str = str.slice(pos);
                    if (isUndefined(c))
                        c = true;
                    source = isRegExp(reg) ? reg.source.replace('^', '') : escapeRegExp(reg);
                    return regexp('^' + source, c ? '' : 'i').test(str);
                },
                'endsWith': function (reg, pos, c) {
                    var str = this, source;
                    if (isDefined(pos))
                        str = str.slice(0, pos);
                    if (isUndefined(c))
                        c = true;
                    source = isRegExp(reg) ? reg.source.replace('$', '') : escapeRegExp(reg);
                    return regexp(source + '$', c ? '' : 'i').test(str);
                }
            });
            extend(string, true, false, {
                'escapeRegExp': function () {
                    return escapeRegExp(this);
                },
                'escapeURL': function (param) {
                    return param ? encodeURIComponent(this) : encodeURI(this);
                },
                'unescapeURL': function (param) {
                    return param ? decodeURI(this) : decodeURIComponent(this);
                },
                'escapeHTML': function () {
                    return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/\//g, '&#x2f;');
                },
                'unescapeHTML': function () {
                    return this.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, '\'').replace(/&#x2f;/g, '/').replace(/&amp;/g, '&');
                },
                'encodeBase64': function () {
                    return btoa(this);
                },
                'decodeBase64': function () {
                    return atob(this);
                },
                'each': function (search, fn) {
                    var match, i, len;
                    if (isFunction(search)) {
                        fn = search;
                        search = /[\s\S]/g;
                    } else if (!search) {
                        search = /[\s\S]/g;
                    } else if (isString(search)) {
                        search = regexp(escapeRegExp(search), 'gi');
                    } else if (isRegExp(search)) {
                        search = regexp(search.source, getRegExpFlags(search, 'g'));
                    }
                    match = this.match(search) || [];
                    if (fn) {
                        for (i = 0, len = match.length; i < len; i++) {
                            match[i] = fn.call(this, match[i], i, match) || match[i];
                        }
                    }
                    return match;
                },
                'shift': function (n) {
                    var result = '';
                    n = n || 0;
                    this.codes(function (c) {
                        result += chr(c + n);
                    });
                    return result;
                },
                'codes': function (fn) {
                    var codes = [], i, len;
                    for (i = 0, len = this.length; i < len; i++) {
                        var code = this.charCodeAt(i);
                        codes.push(code);
                        if (fn)
                            fn.call(this, code, i);
                    }
                    return codes;
                },
                'chars': function (fn) {
                    return this.each(fn);
                },
                'words': function (fn) {
                    return this.trim().each(/\S+/g, fn);
                },
                'lines': function (fn) {
                    return this.trim().each(/^.*$/gm, fn);
                },
                'paragraphs': function (fn) {
                    var paragraphs = this.trim().split(/[\r\n]{2,}/);
                    paragraphs = paragraphs.map(function (p) {
                        if (fn)
                            var s = fn.call(p);
                        return s ? s : p;
                    });
                    return paragraphs;
                },
                'isBlank': function () {
                    return this.trim().length === 0;
                },
                'has': function (find) {
                    return this.search(isRegExp(find) ? find : escapeRegExp(find)) !== -1;
                },
                'add': function (str, index) {
                    index = isUndefined(index) ? this.length : index;
                    return this.slice(0, index) + str + this.slice(index);
                },
                'remove': function (f) {
                    return this.replace(f, '');
                },
                'reverse': function () {
                    return this.split('').reverse().join('');
                },
                'compact': function () {
                    return this.trim().replace(/([\r\n\s　])+/g, function (match, whitespace) {
                        return whitespace === '\u3000' ? whitespace : ' ';
                    });
                },
                'at': function () {
                    return entryAtIndex(this, arguments, true);
                },
                'from': function (num) {
                    return this.slice(num);
                },
                'to': function (num) {
                    if (isUndefined(num))
                        num = this.length;
                    return this.slice(0, num);
                },
                'dasherize': function () {
                    return this.underscore().replace(/_/g, '-');
                },
                'underscore': function () {
                    return this.replace(/[-\s]+/g, '_').replace(string.Inflector && string.Inflector.acronymRegExp, function (acronym, index) {
                        return (index > 0 ? '_' : '') + acronym.toLowerCase();
                    }).replace(/([A-Z\d]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
                },
                'camelize': function (first) {
                    return this.underscore().replace(/(^|_)([^_]+)/g, function (match, pre, word, index) {
                        var acronym = getAcronym(word), capitalize = first !== false || index > 0;
                        if (acronym)
                            return capitalize ? acronym : acronym.toLowerCase();
                        return capitalize ? word.capitalize() : word;
                    });
                },
                'spacify': function () {
                    return this.underscore().replace(/_/g, ' ');
                },
                'stripTags': function () {
                    var str = this, args = arguments.length > 0 ? arguments : [''];
                    flattenedArgs(args, function (tag) {
                        str = str.replace(regexp('</?' + escapeRegExp(tag) + '[^<>]*>', 'gi'), '');
                    });
                    return str;
                },
                'removeTags': function () {
                    var str = this, args = arguments.length > 0 ? arguments : ['\\S+'];
                    flattenedArgs(args, function (t) {
                        var reg = regexp('<(' + t + ')[^<>]*(?:\\/>|>.*?<\\/\\1>)', 'gi');
                        str = str.replace(reg, '');
                    });
                    return str;
                },
                'truncate': function (length, split, from, ellipsis) {
                    var pos, prepend = '', append = '', str = this.toString(), chars = '[' + getTrimmableCharacters() + ']+', space = '[^' + getTrimmableCharacters() + ']*', reg = regexp(chars + space + '$');
                    ellipsis = isUndefined(ellipsis) ? '...' : string(ellipsis);
                    if (str.length <= length) {
                        return str;
                    }
                    switch (from) {
                    case 'left':
                        pos = str.length - length;
                        prepend = ellipsis;
                        str = str.slice(pos);
                        reg = regexp('^' + space + chars);
                        break;
                    case 'middle':
                        pos = floor(length / 2);
                        append = ellipsis + str.slice(str.length - pos).trimLeft();
                        str = str.slice(0, pos);
                        break;
                    default:
                        pos = length;
                        append = ellipsis;
                        str = str.slice(0, pos);
                    }
                    if (split === false && this.slice(pos, pos + 1).match(/\S/)) {
                        str = str.remove(reg);
                    }
                    return prepend + str + append;
                },
                'pad': function (padding, num) {
                    return repeatString(num, padding) + this + repeatString(num, padding);
                },
                'padLeft': function (padding, num) {
                    return repeatString(num, padding) + this;
                },
                'padRight': function (padding, num) {
                    return this + repeatString(num, padding);
                },
                'first': function (num) {
                    if (isUndefined(num))
                        num = 1;
                    return this.substr(0, num);
                },
                'last': function (num) {
                    if (isUndefined(num))
                        num = 1;
                    var start = this.length - num < 0 ? 0 : this.length - num;
                    return this.substr(start);
                },
                'repeat': function (num) {
                    var result = '', str = this;
                    if (!isNumber(num) || num < 1)
                        return '';
                    while (num) {
                        if (num & 1) {
                            result += str;
                        }
                        if (num >>= 1) {
                            str += str;
                        }
                    }
                    return result;
                },
                'toNumber': function (base) {
                    var str = this.replace(/,/g, '');
                    return str.match(/\./) ? parseFloat(str) : parseInt(str, base || 10);
                },
                'capitalize': function (all) {
                    var lastResponded;
                    return this.toLowerCase().replace(all ? /[\s\S]/g : /^\S/, function (lower) {
                        var upper = lower.toUpperCase(), result;
                        result = lastResponded ? lower : upper;
                        lastResponded = upper !== lower;
                        return result;
                    });
                },
                'assign': function () {
                    var assign = {};
                    multiArgs(arguments, function (a, i) {
                        if (isObject(a)) {
                            simpleMerge(assign, a);
                        } else {
                            assign[i + 1] = a;
                        }
                    });
                    return this.replace(/\{([^{]+?)\}/g, function (m, key) {
                        return hasOwnProperty(assign, key) ? assign[key] : m;
                    });
                },
                'namespace': function (context) {
                    context = context || globalContext;
                    iterateOverObject(this.split('.'), function (i, s) {
                        return !!(context = context[s]);
                    });
                    return context;
                }
            });
            extend(string, true, false, { 'insert': string.prototype.add });
            buildBase64('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=');
            var plurals = [], singulars = [], uncountables = [], humans = [], acronyms = {}, Downcased, Inflector;
            function removeFromArray(arr, find) {
                var index = arr.indexOf(find);
                if (index > -1) {
                    arr.splice(index, 1);
                }
            }
            function removeFromUncountablesAndAddTo(arr, rule, replacement) {
                if (isString(rule)) {
                    removeFromArray(uncountables, rule);
                }
                removeFromArray(uncountables, replacement);
                arr.unshift({
                    rule: rule,
                    replacement: replacement
                });
            }
            function paramMatchesType(param, type) {
                return param == type || param == 'all' || !param;
            }
            function isUncountable(word) {
                return uncountables.some(function (uncountable) {
                    return new regexp('\\b' + uncountable + '$', 'i').test(word);
                });
            }
            function inflect(word, pluralize) {
                word = isString(word) ? word.toString() : '';
                if (word.isBlank() || isUncountable(word)) {
                    return word;
                } else {
                    return runReplacements(word, pluralize ? plurals : singulars);
                }
            }
            function runReplacements(word, table) {
                iterateOverObject(table, function (i, inflection) {
                    if (word.match(inflection.rule)) {
                        word = word.replace(inflection.rule, inflection.replacement);
                        return false;
                    }
                });
                return word;
            }
            function capitalize(word) {
                return word.replace(/^\W*[a-z]/, function (w) {
                    return w.toUpperCase();
                });
            }
            Inflector = {
                'acronym': function (word) {
                    acronyms[word.toLowerCase()] = word;
                    var all = object.keys(acronyms).map(function (key) {
                            return acronyms[key];
                        });
                    Inflector.acronymRegExp = regexp(all.join('|'), 'g');
                },
                'plural': function (rule, replacement) {
                    removeFromUncountablesAndAddTo(plurals, rule, replacement);
                },
                'singular': function (rule, replacement) {
                    removeFromUncountablesAndAddTo(singulars, rule, replacement);
                },
                'irregular': function (singular, plural) {
                    var singularFirst = singular.first(), singularRest = singular.from(1), pluralFirst = plural.first(), pluralRest = plural.from(1), pluralFirstUpper = pluralFirst.toUpperCase(), pluralFirstLower = pluralFirst.toLowerCase(), singularFirstUpper = singularFirst.toUpperCase(), singularFirstLower = singularFirst.toLowerCase();
                    removeFromArray(uncountables, singular);
                    removeFromArray(uncountables, plural);
                    if (singularFirstUpper == pluralFirstUpper) {
                        Inflector.plural(new regexp('({1}){2}$'.assign(singularFirst, singularRest), 'i'), '$1' + pluralRest);
                        Inflector.plural(new regexp('({1}){2}$'.assign(pluralFirst, pluralRest), 'i'), '$1' + pluralRest);
                        Inflector.singular(new regexp('({1}){2}$'.assign(pluralFirst, pluralRest), 'i'), '$1' + singularRest);
                    } else {
                        Inflector.plural(new regexp('{1}{2}$'.assign(singularFirstUpper, singularRest)), pluralFirstUpper + pluralRest);
                        Inflector.plural(new regexp('{1}{2}$'.assign(singularFirstLower, singularRest)), pluralFirstLower + pluralRest);
                        Inflector.plural(new regexp('{1}{2}$'.assign(pluralFirstUpper, pluralRest)), pluralFirstUpper + pluralRest);
                        Inflector.plural(new regexp('{1}{2}$'.assign(pluralFirstLower, pluralRest)), pluralFirstLower + pluralRest);
                        Inflector.singular(new regexp('{1}{2}$'.assign(pluralFirstUpper, pluralRest)), singularFirstUpper + singularRest);
                        Inflector.singular(new regexp('{1}{2}$'.assign(pluralFirstLower, pluralRest)), singularFirstLower + singularRest);
                    }
                },
                'uncountable': function (first) {
                    var add = array.isArray(first) ? first : multiArgs(arguments);
                    uncountables = uncountables.concat(add);
                },
                'human': function (rule, replacement) {
                    humans.unshift({
                        rule: rule,
                        replacement: replacement
                    });
                },
                'clear': function (type) {
                    if (paramMatchesType(type, 'singulars'))
                        singulars = [];
                    if (paramMatchesType(type, 'plurals'))
                        plurals = [];
                    if (paramMatchesType(type, 'uncountables'))
                        uncountables = [];
                    if (paramMatchesType(type, 'humans'))
                        humans = [];
                    if (paramMatchesType(type, 'acronyms'))
                        acronyms = {};
                }
            };
            Downcased = [
                'and',
                'or',
                'nor',
                'a',
                'an',
                'the',
                'so',
                'but',
                'to',
                'of',
                'at',
                'by',
                'from',
                'into',
                'on',
                'onto',
                'off',
                'out',
                'in',
                'over',
                'with',
                'for'
            ];
            Inflector.plural(/$/, 's');
            Inflector.plural(/s$/gi, 's');
            Inflector.plural(/(ax|test)is$/gi, '$1es');
            Inflector.plural(/(octop|vir|fung|foc|radi|alumn)(i|us)$/gi, '$1i');
            Inflector.plural(/(census|alias|status)$/gi, '$1es');
            Inflector.plural(/(bu)s$/gi, '$1ses');
            Inflector.plural(/(buffal|tomat)o$/gi, '$1oes');
            Inflector.plural(/([ti])um$/gi, '$1a');
            Inflector.plural(/([ti])a$/gi, '$1a');
            Inflector.plural(/sis$/gi, 'ses');
            Inflector.plural(/f+e?$/gi, 'ves');
            Inflector.plural(/(cuff|roof)$/gi, '$1s');
            Inflector.plural(/([ht]ive)$/gi, '$1s');
            Inflector.plural(/([^aeiouy]o)$/gi, '$1es');
            Inflector.plural(/([^aeiouy]|qu)y$/gi, '$1ies');
            Inflector.plural(/(x|ch|ss|sh)$/gi, '$1es');
            Inflector.plural(/(matr|vert|ind)(?:ix|ex)$/gi, '$1ices');
            Inflector.plural(/([ml])ouse$/gi, '$1ice');
            Inflector.plural(/([ml])ice$/gi, '$1ice');
            Inflector.plural(/^(ox)$/gi, '$1en');
            Inflector.plural(/^(oxen)$/gi, '$1');
            Inflector.plural(/(quiz)$/gi, '$1zes');
            Inflector.plural(/(phot|cant|hom|zer|pian|portic|pr|quart|kimon)o$/gi, '$1os');
            Inflector.plural(/(craft)$/gi, '$1');
            Inflector.plural(/([ft])[eo]{2}(th?)$/gi, '$1ee$2');
            Inflector.singular(/s$/gi, '');
            Inflector.singular(/([pst][aiu]s)$/gi, '$1');
            Inflector.singular(/([aeiouy])ss$/gi, '$1ss');
            Inflector.singular(/(n)ews$/gi, '$1ews');
            Inflector.singular(/([ti])a$/gi, '$1um');
            Inflector.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/gi, '$1$2sis');
            Inflector.singular(/(^analy)ses$/gi, '$1sis');
            Inflector.singular(/(i)(f|ves)$/i, '$1fe');
            Inflector.singular(/([aeolr]f?)(f|ves)$/i, '$1f');
            Inflector.singular(/([ht]ive)s$/gi, '$1');
            Inflector.singular(/([^aeiouy]|qu)ies$/gi, '$1y');
            Inflector.singular(/(s)eries$/gi, '$1eries');
            Inflector.singular(/(m)ovies$/gi, '$1ovie');
            Inflector.singular(/(x|ch|ss|sh)es$/gi, '$1');
            Inflector.singular(/([ml])(ous|ic)e$/gi, '$1ouse');
            Inflector.singular(/(bus)(es)?$/gi, '$1');
            Inflector.singular(/(o)es$/gi, '$1');
            Inflector.singular(/(shoe)s?$/gi, '$1');
            Inflector.singular(/(cris|ax|test)[ie]s$/gi, '$1is');
            Inflector.singular(/(octop|vir|fung|foc|radi|alumn)(i|us)$/gi, '$1us');
            Inflector.singular(/(census|alias|status)(es)?$/gi, '$1');
            Inflector.singular(/^(ox)(en)?/gi, '$1');
            Inflector.singular(/(vert|ind)(ex|ices)$/gi, '$1ex');
            Inflector.singular(/(matr)(ix|ices)$/gi, '$1ix');
            Inflector.singular(/(quiz)(zes)?$/gi, '$1');
            Inflector.singular(/(database)s?$/gi, '$1');
            Inflector.singular(/ee(th?)$/gi, 'oo$1');
            Inflector.irregular('person', 'people');
            Inflector.irregular('man', 'men');
            Inflector.irregular('child', 'children');
            Inflector.irregular('sex', 'sexes');
            Inflector.irregular('move', 'moves');
            Inflector.irregular('save', 'saves');
            Inflector.irregular('save', 'saves');
            Inflector.irregular('cow', 'kine');
            Inflector.irregular('goose', 'geese');
            Inflector.irregular('zombie', 'zombies');
            Inflector.uncountable('equipment,information,rice,money,species,series,fish,sheep,jeans'.split(','));
            extend(string, true, false, {
                'pluralize': function () {
                    return inflect(this, true);
                },
                'singularize': function () {
                    return inflect(this, false);
                },
                'humanize': function () {
                    var str = runReplacements(this, humans), acronym;
                    str = str.replace(/_id$/g, '');
                    str = str.replace(/(_)?([a-z\d]*)/gi, function (match, _, word) {
                        acronym = hasOwnProperty(acronyms, word) ? acronyms[word] : null;
                        return (_ ? ' ' : '') + (acronym || word.toLowerCase());
                    });
                    return capitalize(str);
                },
                'titleize': function () {
                    var fullStopPunctuation = /[.:;!]$/, hasPunctuation, lastHadPunctuation, isFirstOrLast;
                    return this.spacify().humanize().words(function (word, index, words) {
                        hasPunctuation = fullStopPunctuation.test(word);
                        isFirstOrLast = index == 0 || index == words.length - 1 || hasPunctuation || lastHadPunctuation;
                        lastHadPunctuation = hasPunctuation;
                        if (isFirstOrLast || Downcased.indexOf(word) === -1) {
                            return capitalize(word);
                        } else {
                            return word;
                        }
                    }).join(' ');
                },
                'parameterize': function (separator) {
                    var str = this;
                    if (separator === undefined)
                        separator = '-';
                    if (str.normalize) {
                        str = str.normalize();
                    }
                    str = str.replace(/[^a-z0-9\-_]+/gi, separator);
                    if (separator) {
                        str = str.replace(new regexp('^{sep}+|{sep}+$|({sep}){sep}+'.assign({ 'sep': escapeRegExp(separator) }), 'g'), '$1');
                    }
                    return encodeURI(str.toLowerCase());
                }
            });
            string.Inflector = Inflector;
            string.Inflector.acronyms = acronyms;
            var NormalizeMap, NormalizeReg = '', NormalizeSource;
            var unicodeScripts = [
                    {
                        names: ['Arabic'],
                        source: '\u0600-\u06ff'
                    },
                    {
                        names: ['Cyrillic'],
                        source: '\u0400-\u04ff'
                    },
                    {
                        names: ['Devanagari'],
                        source: '\u0900-\u097f'
                    },
                    {
                        names: ['Greek'],
                        source: '\u0370-\u03ff'
                    },
                    {
                        names: ['Hangul'],
                        source: '\uac00-\ud7af\u1100-\u11ff'
                    },
                    {
                        names: [
                            'Han',
                            'Kanji'
                        ],
                        source: '\u4e00-\u9fff\uf900-\ufaff'
                    },
                    {
                        names: ['Hebrew'],
                        source: '\u0590-\u05ff'
                    },
                    {
                        names: ['Hiragana'],
                        source: '\u3040-\u309f\u30fb-\u30fc'
                    },
                    {
                        names: ['Kana'],
                        source: '\u3040-\u30ff\uff61-\uff9f'
                    },
                    {
                        names: ['Katakana'],
                        source: '\u30a0-\u30ff\uff61-\uff9f'
                    },
                    {
                        names: ['Latin'],
                        source: '\x01-\x7f\x80-\xff\u0100-\u017f\u0180-\u024f'
                    },
                    {
                        names: ['Thai'],
                        source: '\u0e00-\u0e7f'
                    }
                ];
            function buildUnicodeScripts() {
                unicodeScripts.forEach(function (s) {
                    var is = regexp('^[' + s.source + '\\s]+$');
                    var has = regexp('[' + s.source + ']');
                    s.names.forEach(function (name) {
                        defineProperty(string.prototype, 'is' + name, function () {
                            return is.test(this.trim());
                        });
                        defineProperty(string.prototype, 'has' + name, function () {
                            return has.test(this);
                        });
                    });
                });
            }
            var widthConversionRanges = [
                    {
                        type: 'a',
                        shift: 65248,
                        start: 65,
                        end: 90
                    },
                    {
                        type: 'a',
                        shift: 65248,
                        start: 97,
                        end: 122
                    },
                    {
                        type: 'n',
                        shift: 65248,
                        start: 48,
                        end: 57
                    },
                    {
                        type: 'p',
                        shift: 65248,
                        start: 33,
                        end: 47
                    },
                    {
                        type: 'p',
                        shift: 65248,
                        start: 58,
                        end: 64
                    },
                    {
                        type: 'p',
                        shift: 65248,
                        start: 91,
                        end: 96
                    },
                    {
                        type: 'p',
                        shift: 65248,
                        start: 123,
                        end: 126
                    }
                ];
            var WidthConversionTable;
            var allHankaku = /[\u0020-\u00A5]|[\uFF61-\uFF9F][ﾞﾟ]?/g;
            var allZenkaku = /[\u3000-\u301C]|[\u301A-\u30FC]|[\uFF01-\uFF60]|[\uFFE0-\uFFE6]/g;
            var hankakuPunctuation = '\uff61\uff64\uff62\uff63\xa5\xa2\xa3';
            var zenkakuPunctuation = '\u3002\u3001\u300c\u300d\uffe5\uffe0\uffe1';
            var voicedKatakana = /[カキクケコサシスセソタチツテトハヒフヘホ]/;
            var semiVoicedKatakana = /[ハヒフヘホヲ]/;
            var hankakuKatakana = '\uff71\uff72\uff73\uff74\uff75\uff67\uff68\uff69\uff6a\uff6b\uff76\uff77\uff78\uff79\uff7a\uff7b\uff7c\uff7d\uff7e\uff7f\uff80\uff81\uff82\uff6f\uff83\uff84\uff85\uff86\uff87\uff88\uff89\uff8a\uff8b\uff8c\uff8d\uff8e\uff8f\uff90\uff91\uff92\uff93\uff94\uff6c\uff95\uff6d\uff96\uff6e\uff97\uff98\uff99\uff9a\uff9b\uff9c\uff66\uff9d\uff70\uff65';
            var zenkakuKatakana = '\u30a2\u30a4\u30a6\u30a8\u30aa\u30a1\u30a3\u30a5\u30a7\u30a9\u30ab\u30ad\u30af\u30b1\u30b3\u30b5\u30b7\u30b9\u30bb\u30bd\u30bf\u30c1\u30c4\u30c3\u30c6\u30c8\u30ca\u30cb\u30cc\u30cd\u30ce\u30cf\u30d2\u30d5\u30d8\u30db\u30de\u30df\u30e0\u30e1\u30e2\u30e4\u30e3\u30e6\u30e5\u30e8\u30e7\u30e9\u30ea\u30eb\u30ec\u30ed\u30ef\u30f2\u30f3\u30fc\u30fb';
            function convertCharacterWidth(str, args, reg, type) {
                if (!WidthConversionTable) {
                    buildWidthConversionTables();
                }
                var mode = multiArgs(args).join(''), table = WidthConversionTable[type];
                mode = mode.replace(/all/, '').replace(/(\w)lphabet|umbers?|atakana|paces?|unctuation/g, '$1');
                return str.replace(reg, function (c) {
                    if (table[c] && (!mode || mode.has(table[c].type))) {
                        return table[c].to;
                    } else {
                        return c;
                    }
                });
            }
            function buildWidthConversionTables() {
                var hankaku;
                WidthConversionTable = {
                    'zenkaku': {},
                    'hankaku': {}
                };
                widthConversionRanges.forEach(function (r) {
                    getRange(r.start, r.end, function (n) {
                        setWidthConversion(r.type, chr(n), chr(n + r.shift));
                    });
                });
                zenkakuKatakana.each(function (c, i) {
                    hankaku = hankakuKatakana.charAt(i);
                    setWidthConversion('k', hankaku, c);
                    if (c.match(voicedKatakana)) {
                        setWidthConversion('k', hankaku + '\uff9e', c.shift(1));
                    }
                    if (c.match(semiVoicedKatakana)) {
                        setWidthConversion('k', hankaku + '\uff9f', c.shift(2));
                    }
                });
                zenkakuPunctuation.each(function (c, i) {
                    setWidthConversion('p', hankakuPunctuation.charAt(i), c);
                });
                setWidthConversion('k', '\uff73\uff9e', '\u30f4');
                setWidthConversion('k', '\uff66\uff9e', '\u30fa');
                setWidthConversion('s', ' ', '\u3000');
            }
            function setWidthConversion(type, half, full) {
                WidthConversionTable['zenkaku'][half] = {
                    type: type,
                    to: full
                };
                WidthConversionTable['hankaku'][full] = {
                    type: type,
                    to: half
                };
            }
            function buildNormalizeMap() {
                NormalizeMap = {};
                iterateOverObject(NormalizeSource, function (normalized, str) {
                    str.split('').forEach(function (character) {
                        NormalizeMap[character] = normalized;
                    });
                    NormalizeReg += str;
                });
                NormalizeReg = regexp('[' + NormalizeReg + ']', 'g');
            }
            NormalizeSource = {
                'A': 'A\u24b6\uff21\xc0\xc1\xc2\u1ea6\u1ea4\u1eaa\u1ea8\xc3\u0100\u0102\u1eb0\u1eae\u1eb4\u1eb2\u0226\u01e0\xc4\u01de\u1ea2\xc5\u01fa\u01cd\u0200\u0202\u1ea0\u1eac\u1eb6\u1e00\u0104\u023a\u2c6f',
                'B': 'B\u24b7\uff22\u1e02\u1e04\u1e06\u0243\u0182\u0181',
                'C': 'C\u24b8\uff23\u0106\u0108\u010a\u010c\xc7\u1e08\u0187\u023b\ua73e',
                'D': 'D\u24b9\uff24\u1e0a\u010e\u1e0c\u1e10\u1e12\u1e0e\u0110\u018b\u018a\u0189\ua779',
                'E': 'E\u24ba\uff25\xc8\xc9\xca\u1ec0\u1ebe\u1ec4\u1ec2\u1ebc\u0112\u1e14\u1e16\u0114\u0116\xcb\u1eba\u011a\u0204\u0206\u1eb8\u1ec6\u0228\u1e1c\u0118\u1e18\u1e1a\u0190\u018e',
                'F': 'F\u24bb\uff26\u1e1e\u0191\ua77b',
                'G': 'G\u24bc\uff27\u01f4\u011c\u1e20\u011e\u0120\u01e6\u0122\u01e4\u0193\ua7a0\ua77d\ua77e',
                'H': 'H\u24bd\uff28\u0124\u1e22\u1e26\u021e\u1e24\u1e28\u1e2a\u0126\u2c67\u2c75\ua78d',
                'I': 'I\u24be\uff29\xcc\xcd\xce\u0128\u012a\u012c\u0130\xcf\u1e2e\u1ec8\u01cf\u0208\u020a\u1eca\u012e\u1e2c\u0197',
                'J': 'J\u24bf\uff2a\u0134\u0248',
                'K': 'K\u24c0\uff2b\u1e30\u01e8\u1e32\u0136\u1e34\u0198\u2c69\ua740\ua742\ua744\ua7a2',
                'L': 'L\u24c1\uff2c\u013f\u0139\u013d\u1e36\u1e38\u013b\u1e3c\u1e3a\u0141\u023d\u2c62\u2c60\ua748\ua746\ua780',
                'M': 'M\u24c2\uff2d\u1e3e\u1e40\u1e42\u2c6e\u019c',
                'N': 'N\u24c3\uff2e\u01f8\u0143\xd1\u1e44\u0147\u1e46\u0145\u1e4a\u1e48\u0220\u019d\ua790\ua7a4',
                'O': 'O\u24c4\uff2f\xd2\xd3\xd4\u1ed2\u1ed0\u1ed6\u1ed4\xd5\u1e4c\u022c\u1e4e\u014c\u1e50\u1e52\u014e\u022e\u0230\xd6\u022a\u1ece\u0150\u01d1\u020c\u020e\u01a0\u1edc\u1eda\u1ee0\u1ede\u1ee2\u1ecc\u1ed8\u01ea\u01ec\xd8\u01fe\u0186\u019f\ua74a\ua74c',
                'P': 'P\u24c5\uff30\u1e54\u1e56\u01a4\u2c63\ua750\ua752\ua754',
                'Q': 'Q\u24c6\uff31\ua756\ua758\u024a',
                'R': 'R\u24c7\uff32\u0154\u1e58\u0158\u0210\u0212\u1e5a\u1e5c\u0156\u1e5e\u024c\u2c64\ua75a\ua7a6\ua782',
                'S': 'S\u24c8\uff33\u1e9e\u015a\u1e64\u015c\u1e60\u0160\u1e66\u1e62\u1e68\u0218\u015e\u2c7e\ua7a8\ua784',
                'T': 'T\u24c9\uff34\u1e6a\u0164\u1e6c\u021a\u0162\u1e70\u1e6e\u0166\u01ac\u01ae\u023e\ua786',
                'U': 'U\u24ca\uff35\xd9\xda\xdb\u0168\u1e78\u016a\u1e7a\u016c\xdc\u01db\u01d7\u01d5\u01d9\u1ee6\u016e\u0170\u01d3\u0214\u0216\u01af\u1eea\u1ee8\u1eee\u1eec\u1ef0\u1ee4\u1e72\u0172\u1e76\u1e74\u0244',
                'V': 'V\u24cb\uff36\u1e7c\u1e7e\u01b2\ua75e\u0245',
                'W': 'W\u24cc\uff37\u1e80\u1e82\u0174\u1e86\u1e84\u1e88\u2c72',
                'X': 'X\u24cd\uff38\u1e8a\u1e8c',
                'Y': 'Y\u24ce\uff39\u1ef2\xdd\u0176\u1ef8\u0232\u1e8e\u0178\u1ef6\u1ef4\u01b3\u024e\u1efe',
                'Z': 'Z\u24cf\uff3a\u0179\u1e90\u017b\u017d\u1e92\u1e94\u01b5\u0224\u2c7f\u2c6b\ua762',
                'a': 'a\u24d0\uff41\u1e9a\xe0\xe1\xe2\u1ea7\u1ea5\u1eab\u1ea9\xe3\u0101\u0103\u1eb1\u1eaf\u1eb5\u1eb3\u0227\u01e1\xe4\u01df\u1ea3\xe5\u01fb\u01ce\u0201\u0203\u1ea1\u1ead\u1eb7\u1e01\u0105\u2c65\u0250',
                'b': 'b\u24d1\uff42\u1e03\u1e05\u1e07\u0180\u0183\u0253',
                'c': 'c\u24d2\uff43\u0107\u0109\u010b\u010d\xe7\u1e09\u0188\u023c\ua73f\u2184',
                'd': 'd\u24d3\uff44\u1e0b\u010f\u1e0d\u1e11\u1e13\u1e0f\u0111\u018c\u0256\u0257\ua77a',
                'e': 'e\u24d4\uff45\xe8\xe9\xea\u1ec1\u1ebf\u1ec5\u1ec3\u1ebd\u0113\u1e15\u1e17\u0115\u0117\xeb\u1ebb\u011b\u0205\u0207\u1eb9\u1ec7\u0229\u1e1d\u0119\u1e19\u1e1b\u0247\u025b\u01dd',
                'f': 'f\u24d5\uff46\u1e1f\u0192\ua77c',
                'g': 'g\u24d6\uff47\u01f5\u011d\u1e21\u011f\u0121\u01e7\u0123\u01e5\u0260\ua7a1\u1d79\ua77f',
                'h': 'h\u24d7\uff48\u0125\u1e23\u1e27\u021f\u1e25\u1e29\u1e2b\u1e96\u0127\u2c68\u2c76\u0265',
                'i': 'i\u24d8\uff49\xec\xed\xee\u0129\u012b\u012d\xef\u1e2f\u1ec9\u01d0\u0209\u020b\u1ecb\u012f\u1e2d\u0268\u0131',
                'j': 'j\u24d9\uff4a\u0135\u01f0\u0249',
                'k': 'k\u24da\uff4b\u1e31\u01e9\u1e33\u0137\u1e35\u0199\u2c6a\ua741\ua743\ua745\ua7a3',
                'l': 'l\u24db\uff4c\u0140\u013a\u013e\u1e37\u1e39\u013c\u1e3d\u1e3b\u017f\u0142\u019a\u026b\u2c61\ua749\ua781\ua747',
                'm': 'm\u24dc\uff4d\u1e3f\u1e41\u1e43\u0271\u026f',
                'n': 'n\u24dd\uff4e\u01f9\u0144\xf1\u1e45\u0148\u1e47\u0146\u1e4b\u1e49\u019e\u0272\u0149\ua791\ua7a5',
                'o': 'o\u24de\uff4f\xf2\xf3\xf4\u1ed3\u1ed1\u1ed7\u1ed5\xf5\u1e4d\u022d\u1e4f\u014d\u1e51\u1e53\u014f\u022f\u0231\xf6\u022b\u1ecf\u0151\u01d2\u020d\u020f\u01a1\u1edd\u1edb\u1ee1\u1edf\u1ee3\u1ecd\u1ed9\u01eb\u01ed\xf8\u01ff\u0254\ua74b\ua74d\u0275',
                'p': 'p\u24df\uff50\u1e55\u1e57\u01a5\u1d7d\ua751\ua753\ua755',
                'q': 'q\u24e0\uff51\u024b\ua757\ua759',
                'r': 'r\u24e1\uff52\u0155\u1e59\u0159\u0211\u0213\u1e5b\u1e5d\u0157\u1e5f\u024d\u027d\ua75b\ua7a7\ua783',
                's': 's\u24e2\uff53\u015b\u1e65\u015d\u1e61\u0161\u1e67\u1e63\u1e69\u0219\u015f\u023f\ua7a9\ua785\u1e9b',
                't': 't\u24e3\uff54\u1e6b\u1e97\u0165\u1e6d\u021b\u0163\u1e71\u1e6f\u0167\u01ad\u0288\u2c66\ua787',
                'u': 'u\u24e4\uff55\xf9\xfa\xfb\u0169\u1e79\u016b\u1e7b\u016d\xfc\u01dc\u01d8\u01d6\u01da\u1ee7\u016f\u0171\u01d4\u0215\u0217\u01b0\u1eeb\u1ee9\u1eef\u1eed\u1ef1\u1ee5\u1e73\u0173\u1e77\u1e75\u0289',
                'v': 'v\u24e5\uff56\u1e7d\u1e7f\u028b\ua75f\u028c',
                'w': 'w\u24e6\uff57\u1e81\u1e83\u0175\u1e87\u1e85\u1e98\u1e89\u2c73',
                'x': 'x\u24e7\uff58\u1e8b\u1e8d',
                'y': 'y\u24e8\uff59\u1ef3\xfd\u0177\u1ef9\u0233\u1e8f\xff\u1ef7\u1e99\u1ef5\u01b4\u024f\u1eff',
                'z': 'z\u24e9\uff5a\u017a\u1e91\u017c\u017e\u1e93\u1e95\u01b6\u0225\u0240\u2c6c\ua763',
                'AA': '\ua732',
                'AE': '\xc6\u01fc\u01e2',
                'AO': '\ua734',
                'AU': '\ua736',
                'AV': '\ua738\ua73a',
                'AY': '\ua73c',
                'DZ': '\u01f1\u01c4',
                'Dz': '\u01f2\u01c5',
                'LJ': '\u01c7',
                'Lj': '\u01c8',
                'NJ': '\u01ca',
                'Nj': '\u01cb',
                'OI': '\u01a2',
                'OO': '\ua74e',
                'OU': '\u0222',
                'TZ': '\ua728',
                'VY': '\ua760',
                'aa': '\ua733',
                'ae': '\xe6\u01fd\u01e3',
                'ao': '\ua735',
                'au': '\ua737',
                'av': '\ua739\ua73b',
                'ay': '\ua73d',
                'dz': '\u01f3\u01c6',
                'hv': '\u0195',
                'lj': '\u01c9',
                'nj': '\u01cc',
                'oi': '\u01a3',
                'ou': '\u0223',
                'oo': '\ua74f',
                'ss': '\xdf',
                'tz': '\ua729',
                'vy': '\ua761'
            };
            extend(string, true, false, {
                'normalize': function () {
                    if (!NormalizeMap) {
                        buildNormalizeMap();
                    }
                    return this.replace(NormalizeReg, function (character) {
                        return NormalizeMap[character];
                    });
                },
                'hankaku': function () {
                    return convertCharacterWidth(this, arguments, allZenkaku, 'hankaku');
                },
                'zenkaku': function () {
                    return convertCharacterWidth(this, arguments, allHankaku, 'zenkaku');
                },
                'hiragana': function (all) {
                    var str = this;
                    if (all !== false) {
                        str = str.zenkaku('k');
                    }
                    return str.replace(/[\u30A1-\u30F6]/g, function (c) {
                        return c.shift(-96);
                    });
                },
                'katakana': function () {
                    return this.replace(/[\u3041-\u3096]/g, function (c) {
                        return c.shift(96);
                    });
                }
            });
            buildUnicodeScripts();
            Date.addLocale('da', {
                'plural': true,
                'months': 'januar,februar,marts,april,maj,juni,juli,august,september,oktober,november,december',
                'weekdays': 's\xf8ndag|sondag,mandag,tirsdag,onsdag,torsdag,fredag,l\xf8rdag|lordag',
                'units': 'millisekund:|er,sekund:|er,minut:|ter,tim:e|er,dag:|e,ug:e|er|en,m\xe5ned:|er|en+maaned:|er|en,\xe5r:||et+aar:||et',
                'numbers': 'en|et,to,tre,fire,fem,seks,syv,otte,ni,ti',
                'tokens': 'den,for',
                'articles': 'den',
                'short': 'd. {d}. {month} {yyyy}',
                'long': 'den {d}. {month} {yyyy} {H}:{mm}',
                'full': '{Weekday} den {d}. {month} {yyyy} {H}:{mm}:{ss}',
                'past': '{num} {unit} {sign}',
                'future': '{sign} {num} {unit}',
                'duration': '{num} {unit}',
                'ampm': 'am,pm',
                'modifiers': [
                    {
                        'name': 'day',
                        'src': 'forg\xe5rs|i forg\xe5rs|forgaars|i forgaars',
                        'value': -2
                    },
                    {
                        'name': 'day',
                        'src': 'i g\xe5r|ig\xe5r|i gaar|igaar',
                        'value': -1
                    },
                    {
                        'name': 'day',
                        'src': 'i dag|idag',
                        'value': 0
                    },
                    {
                        'name': 'day',
                        'src': 'i morgen|imorgen',
                        'value': 1
                    },
                    {
                        'name': 'day',
                        'src': 'over morgon|overmorgen|i over morgen|i overmorgen|iovermorgen',
                        'value': 2
                    },
                    {
                        'name': 'sign',
                        'src': 'siden',
                        'value': -1
                    },
                    {
                        'name': 'sign',
                        'src': 'om',
                        'value': 1
                    },
                    {
                        'name': 'shift',
                        'src': 'i sidste|sidste',
                        'value': -1
                    },
                    {
                        'name': 'shift',
                        'src': 'denne',
                        'value': 0
                    },
                    {
                        'name': 'shift',
                        'src': 'n\xe6ste|naeste',
                        'value': 1
                    }
                ],
                'dateParse': [
                    '{num} {unit} {sign}',
                    '{sign} {num} {unit}',
                    '{1?} {num} {unit} {sign}',
                    '{shift} {unit=5-7}'
                ],
                'timeParse': [
                    '{0?} {weekday?} {date?} {month} {year}',
                    '{date} {month}',
                    '{shift} {weekday}'
                ]
            });
            Date.addLocale('de', {
                'plural': true,
                'capitalizeUnit': true,
                'months': 'Januar,Februar,M\xe4rz|Marz,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember',
                'weekdays': 'Sonntag,Montag,Dienstag,Mittwoch,Donnerstag,Freitag,Samstag',
                'units': 'Millisekunde:|n,Sekunde:|n,Minute:|n,Stunde:|n,Tag:|en,Woche:|n,Monat:|en,Jahr:|en',
                'numbers': 'ein:|e|er|en|em,zwei,drei,vier,fuenf,sechs,sieben,acht,neun,zehn',
                'tokens': 'der',
                'short': '{d}. {Month} {yyyy}',
                'long': '{d}. {Month} {yyyy} {H}:{mm}',
                'full': '{Weekday} {d}. {Month} {yyyy} {H}:{mm}:{ss}',
                'past': '{sign} {num} {unit}',
                'future': '{sign} {num} {unit}',
                'duration': '{num} {unit}',
                'timeMarker': 'um',
                'ampm': 'am,pm',
                'modifiers': [
                    {
                        'name': 'day',
                        'src': 'vorgestern',
                        'value': -2
                    },
                    {
                        'name': 'day',
                        'src': 'gestern',
                        'value': -1
                    },
                    {
                        'name': 'day',
                        'src': 'heute',
                        'value': 0
                    },
                    {
                        'name': 'day',
                        'src': 'morgen',
                        'value': 1
                    },
                    {
                        'name': 'day',
                        'src': '\xfcbermorgen|ubermorgen|uebermorgen',
                        'value': 2
                    },
                    {
                        'name': 'sign',
                        'src': 'vor:|her',
                        'value': -1
                    },
                    {
                        'name': 'sign',
                        'src': 'in',
                        'value': 1
                    },
                    {
                        'name': 'shift',
                        'src': 'letzte:|r|n|s',
                        'value': -1
                    },
                    {
                        'name': 'shift',
                        'src': 'n\xe4chste:|r|n|s+nachste:|r|n|s+naechste:|r|n|s+kommende:n|r',
                        'value': 1
                    }
                ],
                'dateParse': [
                    '{sign} {num} {unit}',
                    '{num} {unit} {sign}',
                    '{shift} {unit=5-7}'
                ],
                'timeParse': [
                    '{weekday?} {date?} {month} {year?}',
                    '{shift} {weekday}'
                ]
            });
            Date.addLocale('es', {
                'plural': true,
                'months': 'enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre',
                'weekdays': 'domingo,lunes,martes,mi\xe9rcoles|miercoles,jueves,viernes,s\xe1bado|sabado',
                'units': 'milisegundo:|s,segundo:|s,minuto:|s,hora:|s,d\xeda|d\xedas|dia|dias,semana:|s,mes:|es,a\xf1o|a\xf1os|ano|anos',
                'numbers': 'uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez',
                'tokens': 'el,de',
                'short': '{d} {month} {yyyy}',
                'long': '{d} {month} {yyyy} {H}:{mm}',
                'full': '{Weekday} {d} {month} {yyyy} {H}:{mm}:{ss}',
                'past': '{sign} {num} {unit}',
                'future': '{num} {unit} {sign}',
                'duration': '{num} {unit}',
                'timeMarker': 'a las',
                'ampm': 'am,pm',
                'modifiers': [
                    {
                        'name': 'day',
                        'src': 'anteayer',
                        'value': -2
                    },
                    {
                        'name': 'day',
                        'src': 'ayer',
                        'value': -1
                    },
                    {
                        'name': 'day',
                        'src': 'hoy',
                        'value': 0
                    },
                    {
                        'name': 'day',
                        'src': 'ma\xf1ana|manana',
                        'value': 1
                    },
                    {
                        'name': 'sign',
                        'src': 'hace',
                        'value': -1
                    },
                    {
                        'name': 'sign',
                        'src': 'de ahora',
                        'value': 1
                    },
                    {
                        'name': 'shift',
                        'src': 'pasad:o|a',
                        'value': -1
                    },
                    {
                        'name': 'shift',
                        'src': 'pr\xf3ximo|pr\xf3xima|proximo|proxima',
                        'value': 1
                    }
                ],
                'dateParse': [
                    '{sign} {num} {unit}',
                    '{num} {unit} {sign}',
                    '{0?} {unit=5-7} {shift}',
                    '{0?} {shift} {unit=5-7}'
                ],
                'timeParse': [
                    '{shift} {weekday}',
                    '{weekday} {shift}',
                    '{date?} {1?} {month} {1?} {year?}'
                ]
            });
            Date.addLocale('fi', {
                'plural': true,
                'timeMarker': 'kello',
                'ampm': ',',
                'months': 'tammikuu,helmikuu,maaliskuu,huhtikuu,toukokuu,kes\xe4kuu,hein\xe4kuu,elokuu,syyskuu,lokakuu,marraskuu,joulukuu',
                'weekdays': 'sunnuntai,maanantai,tiistai,keskiviikko,torstai,perjantai,lauantai',
                'units': 'millisekun:ti|tia|teja|tina|nin,sekun:ti|tia|teja|tina|nin,minuut:ti|tia|teja|tina|in,tun:ti|tia|teja|tina|nin,p\xe4iv:\xe4|\xe4\xe4|i\xe4|\xe4n\xe4|\xe4n,viik:ko|koa|koja|on|kona,kuukau:si|sia|tta|den|tena,vuo:si|sia|tta|den|tena',
                'numbers': 'yksi|ensimm\xe4inen,kaksi|toinen,kolm:e|as,nelj\xe4:s,vii:si|des,kuu:si|des,seitsem\xe4:n|s,kahdeksa:n|s,yhdeks\xe4:n|s,kymmene:n|s',
                'articles': '',
                'optionals': '',
                'short': '{d}. {month}ta {yyyy}',
                'long': '{d}. {month}ta {yyyy} kello {H}.{mm}',
                'full': '{Weekday}na {d}. {month}ta {yyyy} kello {H}.{mm}',
                'relative': function (num, unit, ms, format) {
                    var units = this['units'];
                    function numberWithUnit(mult) {
                        return (num === 1 ? '' : num + ' ') + units[8 * mult + unit];
                    }
                    switch (format) {
                    case 'duration':
                        return numberWithUnit(0);
                    case 'past':
                        return numberWithUnit(num > 1 ? 1 : 0) + ' sitten';
                    case 'future':
                        return numberWithUnit(4) + ' p\xe4\xe4st\xe4';
                    }
                },
                'modifiers': [
                    {
                        'name': 'day',
                        'src': 'toissa p\xe4iv\xe4n\xe4|toissa p\xe4iv\xe4ist\xe4',
                        'value': -2
                    },
                    {
                        'name': 'day',
                        'src': 'eilen|eilist\xe4',
                        'value': -1
                    },
                    {
                        'name': 'day',
                        'src': 't\xe4n\xe4\xe4n',
                        'value': 0
                    },
                    {
                        'name': 'day',
                        'src': 'huomenna|huomista',
                        'value': 1
                    },
                    {
                        'name': 'day',
                        'src': 'ylihuomenna|ylihuomista',
                        'value': 2
                    },
                    {
                        'name': 'sign',
                        'src': 'sitten|aiemmin',
                        'value': -1
                    },
                    {
                        'name': 'sign',
                        'src': 'p\xe4\xe4st\xe4|kuluttua|my\xf6hemmin',
                        'value': 1
                    },
                    {
                        'name': 'edge',
                        'src': 'viimeinen|viimeisen\xe4',
                        'value': -2
                    },
                    {
                        'name': 'edge',
                        'src': 'lopussa',
                        'value': -1
                    },
                    {
                        'name': 'edge',
                        'src': 'ensimm\xe4inen|ensimm\xe4isen\xe4',
                        'value': 1
                    },
                    {
                        'name': 'shift',
                        'src': 'edellinen|edellisen\xe4|edelt\xe4v\xe4|edelt\xe4v\xe4n\xe4|viime|toissa',
                        'value': -1
                    },
                    {
                        'name': 'shift',
                        'src': 't\xe4n\xe4|t\xe4m\xe4n',
                        'value': 0
                    },
                    {
                        'name': 'shift',
                        'src': 'seuraava|seuraavana|tuleva|tulevana|ensi',
                        'value': 1
                    }
                ],
                'dateParse': [
                    '{num} {unit} {sign}',
                    '{sign} {num} {unit}',
                    '{num} {unit=4-5} {sign} {day}',
                    '{month} {year}',
                    '{shift} {unit=5-7}'
                ],
                'timeParse': [
                    '{0} {num}{1} {day} of {month} {year?}',
                    '{weekday?} {month} {date}{1} {year?}',
                    '{date} {month} {year}',
                    '{shift} {weekday}',
                    '{shift} week {weekday}',
                    '{weekday} {2} {shift} week',
                    '{0} {date}{1} of {month}',
                    '{0}{month?} {date?}{1} of {shift} {unit=6-7}'
                ]
            });
            Date.addLocale('fr', {
                'plural': true,
                'months': 'janvier,f\xe9vrier|fevrier,mars,avril,mai,juin,juillet,ao\xfbt,septembre,octobre,novembre,d\xe9cembre|decembre',
                'weekdays': 'dimanche,lundi,mardi,mercredi,jeudi,vendredi,samedi',
                'units': 'milliseconde:|s,seconde:|s,minute:|s,heure:|s,jour:|s,semaine:|s,mois,an:|s|n\xe9e|nee',
                'numbers': 'un:|e,deux,trois,quatre,cinq,six,sept,huit,neuf,dix',
                'tokens': ['l\'|la|le'],
                'short': '{d} {month} {yyyy}',
                'long': '{d} {month} {yyyy} {H}:{mm}',
                'full': '{Weekday} {d} {month} {yyyy} {H}:{mm}:{ss}',
                'past': '{sign} {num} {unit}',
                'future': '{sign} {num} {unit}',
                'duration': '{num} {unit}',
                'timeMarker': '\xe0',
                'ampm': 'am,pm',
                'modifiers': [
                    {
                        'name': 'day',
                        'src': 'hier',
                        'value': -1
                    },
                    {
                        'name': 'day',
                        'src': 'aujourd\'hui',
                        'value': 0
                    },
                    {
                        'name': 'day',
                        'src': 'demain',
                        'value': 1
                    },
                    {
                        'name': 'sign',
                        'src': 'il y a',
                        'value': -1
                    },
                    {
                        'name': 'sign',
                        'src': 'dans|d\'ici',
                        'value': 1
                    },
                    {
                        'name': 'shift',
                        'src': 'derni:\xe8r|er|\xe8re|ere',
                        'value': -1
                    },
                    {
                        'name': 'shift',
                        'src': 'prochain:|e',
                        'value': 1
                    }
                ],
                'dateParse': [
                    '{sign} {num} {unit}',
                    '{sign} {num} {unit}',
                    '{0?} {unit=5-7} {shift}'
                ],
                'timeParse': [
                    '{weekday?} {0?} {date?} {month} {year?}',
                    '{0?} {weekday} {shift}'
                ]
            });
            Date.addLocale('it', {
                'plural': true,
                'months': 'Gennaio,Febbraio,Marzo,Aprile,Maggio,Giugno,Luglio,Agosto,Settembre,Ottobre,Novembre,Dicembre',
                'weekdays': 'Domenica,Luned:\xec|i,Marted:\xec|i,Mercoled:\xec|i,Gioved:\xec|i,Venerd:\xec|i,Sabato',
                'units': 'millisecond:o|i,second:o|i,minut:o|i,or:a|e,giorn:o|i,settiman:a|e,mes:e|i,ann:o|i',
                'numbers': 'un:|a|o|\',due,tre,quattro,cinque,sei,sette,otto,nove,dieci',
                'tokens': 'l\'|la|il',
                'short': '{d} {Month} {yyyy}',
                'long': '{d} {Month} {yyyy} {H}:{mm}',
                'full': '{Weekday} {d} {Month} {yyyy} {H}:{mm}:{ss}',
                'past': '{num} {unit} {sign}',
                'future': '{num} {unit} {sign}',
                'duration': '{num} {unit}',
                'timeMarker': 'alle',
                'ampm': 'am,pm',
                'modifiers': [
                    {
                        'name': 'day',
                        'src': 'ieri',
                        'value': -1
                    },
                    {
                        'name': 'day',
                        'src': 'oggi',
                        'value': 0
                    },
                    {
                        'name': 'day',
                        'src': 'domani',
                        'value': 1
                    },
                    {
                        'name': 'day',
                        'src': 'dopodomani',
                        'value': 2
                    },
                    {
                        'name': 'sign',
                        'src': 'fa',
                        'value': -1
                    },
                    {
                        'name': 'sign',
                        'src': 'da adesso',
                        'value': 1
                    },
                    {
                        'name': 'shift',
                        'src': 'scors:o|a',
                        'value': -1
                    },
                    {
                        'name': 'shift',
                        'src': 'prossim:o|a',
                        'value': 1
                    }
                ],
                'dateParse': [
                    '{num} {unit} {sign}',
                    '{0?} {unit=5-7} {shift}',
                    '{0?} {shift} {unit=5-7}'
                ],
                'timeParse': [
                    '{weekday?} {date?} {month} {year?}',
                    '{shift} {weekday}'
                ]
            });
            Date.addLocale('ja', {
                'monthSuffix': '\u6708',
                'weekdays': '\u65e5\u66dc\u65e5,\u6708\u66dc\u65e5,\u706b\u66dc\u65e5,\u6c34\u66dc\u65e5,\u6728\u66dc\u65e5,\u91d1\u66dc\u65e5,\u571f\u66dc\u65e5',
                'units': '\u30df\u30ea\u79d2,\u79d2,\u5206,\u6642\u9593,\u65e5,\u9031\u9593|\u9031,\u30f6\u6708|\u30f5\u6708|\u6708,\u5e74',
                'short': '{yyyy}\u5e74{M}\u6708{d}\u65e5',
                'long': '{yyyy}\u5e74{M}\u6708{d}\u65e5 {H}\u6642{mm}\u5206',
                'full': '{yyyy}\u5e74{M}\u6708{d}\u65e5 {Weekday} {H}\u6642{mm}\u5206{ss}\u79d2',
                'past': '{num}{unit}{sign}',
                'future': '{num}{unit}{sign}',
                'duration': '{num}{unit}',
                'timeSuffixes': '\u6642,\u5206,\u79d2',
                'ampm': '\u5348\u524d,\u5348\u5f8c',
                'modifiers': [
                    {
                        'name': 'day',
                        'src': '\u4e00\u6628\u65e5',
                        'value': -2
                    },
                    {
                        'name': 'day',
                        'src': '\u6628\u65e5',
                        'value': -1
                    },
                    {
                        'name': 'day',
                        'src': '\u4eca\u65e5',
                        'value': 0
                    },
                    {
                        'name': 'day',
                        'src': '\u660e\u65e5',
                        'value': 1
                    },
                    {
                        'name': 'day',
                        'src': '\u660e\u5f8c\u65e5',
                        'value': 2
                    },
                    {
                        'name': 'sign',
                        'src': '\u524d',
                        'value': -1
                    },
                    {
                        'name': 'sign',
                        'src': '\u5f8c',
                        'value': 1
                    },
                    {
                        'name': 'shift',
                        'src': '\u53bb|\u5148',
                        'value': -1
                    },
                    {
                        'name': 'shift',
                        'src': '\u6765',
                        'value': 1
                    }
                ],
                'dateParse': ['{num}{unit}{sign}'],
                'timeParse': [
                    '{shift}{unit=5-7}{weekday?}',
                    '{year}\u5e74{month?}\u6708?{date?}\u65e5?',
                    '{month}\u6708{date?}\u65e5?',
                    '{date}\u65e5'
                ]
            });
            Date.addLocale('ko', {
                'digitDate': true,
                'monthSuffix': '\uc6d4',
                'weekdays': '\uc77c\uc694\uc77c,\uc6d4\uc694\uc77c,\ud654\uc694\uc77c,\uc218\uc694\uc77c,\ubaa9\uc694\uc77c,\uae08\uc694\uc77c,\ud1a0\uc694\uc77c',
                'units': '\ubc00\ub9ac\ucd08,\ucd08,\ubd84,\uc2dc\uac04,\uc77c,\uc8fc,\uac1c\uc6d4|\ub2ec,\ub144',
                'numbers': '\uc77c|\ud55c,\uc774,\uc0bc,\uc0ac,\uc624,\uc721,\uce60,\ud314,\uad6c,\uc2ed',
                'short': '{yyyy}\ub144{M}\uc6d4{d}\uc77c',
                'long': '{yyyy}\ub144{M}\uc6d4{d}\uc77c {H}\uc2dc{mm}\ubd84',
                'full': '{yyyy}\ub144{M}\uc6d4{d}\uc77c {Weekday} {H}\uc2dc{mm}\ubd84{ss}\ucd08',
                'past': '{num}{unit} {sign}',
                'future': '{num}{unit} {sign}',
                'duration': '{num}{unit}',
                'timeSuffixes': '\uc2dc,\ubd84,\ucd08',
                'ampm': '\uc624\uc804,\uc624\ud6c4',
                'modifiers': [
                    {
                        'name': 'day',
                        'src': '\uadf8\uc800\uaed8',
                        'value': -2
                    },
                    {
                        'name': 'day',
                        'src': '\uc5b4\uc81c',
                        'value': -1
                    },
                    {
                        'name': 'day',
                        'src': '\uc624\ub298',
                        'value': 0
                    },
                    {
                        'name': 'day',
                        'src': '\ub0b4\uc77c',
                        'value': 1
                    },
                    {
                        'name': 'day',
                        'src': '\ubaa8\ub808',
                        'value': 2
                    },
                    {
                        'name': 'sign',
                        'src': '\uc804',
                        'value': -1
                    },
                    {
                        'name': 'sign',
                        'src': '\ud6c4',
                        'value': 1
                    },
                    {
                        'name': 'shift',
                        'src': '\uc9c0\ub09c|\uc791',
                        'value': -1
                    },
                    {
                        'name': 'shift',
                        'src': '\uc774\ubc88',
                        'value': 0
                    },
                    {
                        'name': 'shift',
                        'src': '\ub2e4\uc74c|\ub0b4',
                        'value': 1
                    }
                ],
                'dateParse': [
                    '{num}{unit} {sign}',
                    '{shift?} {unit=5-7}'
                ],
                'timeParse': [
                    '{shift} {unit=5?} {weekday}',
                    '{year}\ub144{month?}\uc6d4?{date?}\uc77c?',
                    '{month}\uc6d4{date?}\uc77c?',
                    '{date}\uc77c'
                ]
            });
            Date.addLocale('nl', {
                'plural': true,
                'months': 'januari,februari,maart,april,mei,juni,juli,augustus,september,oktober,november,december',
                'weekdays': 'zondag|zo,maandag|ma,dinsdag|di,woensdag|woe|wo,donderdag|do,vrijdag|vrij|vr,zaterdag|za',
                'units': 'milliseconde:|n,seconde:|n,minu:ut|ten,uur,dag:|en,we:ek|ken,maand:|en,jaar',
                'numbers': 'een,twee,drie,vier,vijf,zes,zeven,acht,negen',
                'tokens': '',
                'short': '{d} {Month} {yyyy}',
                'long': '{d} {Month} {yyyy} {H}:{mm}',
                'full': '{Weekday} {d} {Month} {yyyy} {H}:{mm}:{ss}',
                'past': '{num} {unit} {sign}',
                'future': '{num} {unit} {sign}',
                'duration': '{num} {unit}',
                'timeMarker': '\'s|om',
                'modifiers': [
                    {
                        'name': 'day',
                        'src': 'gisteren',
                        'value': -1
                    },
                    {
                        'name': 'day',
                        'src': 'vandaag',
                        'value': 0
                    },
                    {
                        'name': 'day',
                        'src': 'morgen',
                        'value': 1
                    },
                    {
                        'name': 'day',
                        'src': 'overmorgen',
                        'value': 2
                    },
                    {
                        'name': 'sign',
                        'src': 'geleden',
                        'value': -1
                    },
                    {
                        'name': 'sign',
                        'src': 'vanaf nu',
                        'value': 1
                    },
                    {
                        'name': 'shift',
                        'src': 'laatste|vorige|afgelopen',
                        'value': -1
                    },
                    {
                        'name': 'shift',
                        'src': 'volgend:|e',
                        'value': 1
                    }
                ],
                'dateParse': [
                    '{num} {unit} {sign}',
                    '{0?} {unit=5-7} {shift}',
                    '{0?} {shift} {unit=5-7}'
                ],
                'timeParse': [
                    '{weekday?} {date?} {month} {year?}',
                    '{shift} {weekday}'
                ]
            });
            Date.addLocale('pl', {
                'plural': true,
                'months': 'Stycze\u0144|Stycznia,Luty|Lutego,Marzec|Marca,Kwiecie\u0144|Kwietnia,Maj|Maja,Czerwiec|Czerwca,Lipiec|Lipca,Sierpie\u0144|Sierpnia,Wrzesie\u0144|Wrze\u015bnia,Pa\u017adziernik|Pa\u017adziernika,Listopad|Listopada,Grudzie\u0144|Grudnia',
                'weekdays': 'Niedziela|Niedziel\u0119,Poniedzia\u0142ek,Wtorek,\u015arod:a|\u0119,Czwartek,Pi\u0105tek,Sobota|Sobot\u0119',
                'units': 'milisekund:a|y|,sekund:a|y|,minut:a|y|,godzin:a|y|,dzie\u0144|dni,tydzie\u0144|tygodnie|tygodni,miesi\u0105ce|miesi\u0105ce|miesi\u0119cy,rok|lata|lat',
                'numbers': 'jeden|jedn\u0105,dwa|dwie,trzy,cztery,pi\u0119\u0107,sze\u015b\u0107,siedem,osiem,dziewi\u0119\u0107,dziesi\u0119\u0107',
                'optionals': 'w|we,roku',
                'short': '{d} {Month} {yyyy}',
                'long': '{d} {Month} {yyyy} {H}:{mm}',
                'full': '{Weekday}, {d} {Month} {yyyy} {H}:{mm}:{ss}',
                'past': '{num} {unit} {sign}',
                'future': '{sign} {num} {unit}',
                'duration': '{num} {unit}',
                'timeMarker': 'o',
                'ampm': 'am,pm',
                'modifiers': [
                    {
                        'name': 'day',
                        'src': 'przedwczoraj',
                        'value': -2
                    },
                    {
                        'name': 'day',
                        'src': 'wczoraj',
                        'value': -1
                    },
                    {
                        'name': 'day',
                        'src': 'dzisiaj|dzi\u015b',
                        'value': 0
                    },
                    {
                        'name': 'day',
                        'src': 'jutro',
                        'value': 1
                    },
                    {
                        'name': 'day',
                        'src': 'pojutrze',
                        'value': 2
                    },
                    {
                        'name': 'sign',
                        'src': 'temu|przed',
                        'value': -1
                    },
                    {
                        'name': 'sign',
                        'src': 'za',
                        'value': 1
                    },
                    {
                        'name': 'shift',
                        'src': 'zesz\u0142y|zesz\u0142a|ostatni|ostatnia',
                        'value': -1
                    },
                    {
                        'name': 'shift',
                        'src': 'nast\u0119pny|nast\u0119pna|nast\u0119pnego|przysz\u0142y|przysz\u0142a|przysz\u0142ego',
                        'value': 1
                    }
                ],
                'dateParse': [
                    '{num} {unit} {sign}',
                    '{sign} {num} {unit}',
                    '{month} {year}',
                    '{shift} {unit=5-7}',
                    '{0} {shift?} {weekday}'
                ],
                'timeParse': [
                    '{date} {month} {year?} {1}',
                    '{0} {shift?} {weekday}'
                ]
            });
            Date.addLocale('pt', {
                'plural': true,
                'months': 'janeiro,fevereiro,mar\xe7o,abril,maio,junho,julho,agosto,setembro,outubro,novembro,dezembro',
                'weekdays': 'domingo,segunda-feira,ter\xe7a-feira,quarta-feira,quinta-feira,sexta-feira,s\xe1bado|sabado',
                'units': 'milisegundo:|s,segundo:|s,minuto:|s,hora:|s,dia:|s,semana:|s,m\xeas|m\xeases|mes|meses,ano:|s',
                'numbers': 'um,dois,tr\xeas|tres,quatro,cinco,seis,sete,oito,nove,dez,uma,duas',
                'tokens': 'a,de',
                'short': '{d} de {month} de {yyyy}',
                'long': '{d} de {month} de {yyyy} {H}:{mm}',
                'full': '{Weekday}, {d} de {month} de {yyyy} {H}:{mm}:{ss}',
                'past': '{num} {unit} {sign}',
                'future': '{sign} {num} {unit}',
                'duration': '{num} {unit}',
                'timeMarker': '\xe0s',
                'ampm': 'am,pm',
                'modifiers': [
                    {
                        'name': 'day',
                        'src': 'anteontem',
                        'value': -2
                    },
                    {
                        'name': 'day',
                        'src': 'ontem',
                        'value': -1
                    },
                    {
                        'name': 'day',
                        'src': 'hoje',
                        'value': 0
                    },
                    {
                        'name': 'day',
                        'src': 'amanh:\xe3|a',
                        'value': 1
                    },
                    {
                        'name': 'sign',
                        'src': 'atr\xe1s|atras|h\xe1|ha',
                        'value': -1
                    },
                    {
                        'name': 'sign',
                        'src': 'daqui a',
                        'value': 1
                    },
                    {
                        'name': 'shift',
                        'src': 'passad:o|a',
                        'value': -1
                    },
                    {
                        'name': 'shift',
                        'src': 'pr\xf3ximo|pr\xf3xima|proximo|proxima',
                        'value': 1
                    }
                ],
                'dateParse': [
                    '{num} {unit} {sign}',
                    '{sign} {num} {unit}',
                    '{0?} {unit=5-7} {shift}',
                    '{0?} {shift} {unit=5-7}'
                ],
                'timeParse': [
                    '{date?} {1?} {month} {1?} {year?}',
                    '{0?} {shift} {weekday}'
                ]
            });
            Date.addLocale('ru', {
                'months': '\u042f\u043d\u0432\u0430\u0440:\u044f|\u044c,\u0424\u0435\u0432\u0440\u0430\u043b:\u044f|\u044c,\u041c\u0430\u0440\u0442:\u0430|,\u0410\u043f\u0440\u0435\u043b:\u044f|\u044c,\u041c\u0430:\u044f|\u0439,\u0418\u044e\u043d:\u044f|\u044c,\u0418\u044e\u043b:\u044f|\u044c,\u0410\u0432\u0433\u0443\u0441\u0442:\u0430|,\u0421\u0435\u043d\u0442\u044f\u0431\u0440:\u044f|\u044c,\u041e\u043a\u0442\u044f\u0431\u0440:\u044f|\u044c,\u041d\u043e\u044f\u0431\u0440:\u044f|\u044c,\u0414\u0435\u043a\u0430\u0431\u0440:\u044f|\u044c',
                'weekdays': '\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435,\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a,\u0412\u0442\u043e\u0440\u043d\u0438\u043a,\u0421\u0440\u0435\u0434\u0430,\u0427\u0435\u0442\u0432\u0435\u0440\u0433,\u041f\u044f\u0442\u043d\u0438\u0446\u0430,\u0421\u0443\u0431\u0431\u043e\u0442\u0430',
                'units': '\u043c\u0438\u043b\u043b\u0438\u0441\u0435\u043a\u0443\u043d\u0434:\u0430|\u0443|\u044b|,\u0441\u0435\u043a\u0443\u043d\u0434:\u0430|\u0443|\u044b|,\u043c\u0438\u043d\u0443\u0442:\u0430|\u0443|\u044b|,\u0447\u0430\u0441:||\u0430|\u043e\u0432,\u0434\u0435\u043d\u044c|\u0434\u0435\u043d\u044c|\u0434\u043d\u044f|\u0434\u043d\u0435\u0439,\u043d\u0435\u0434\u0435\u043b:\u044f|\u044e|\u0438|\u044c|\u0435,\u043c\u0435\u0441\u044f\u0446:||\u0430|\u0435\u0432|\u0435,\u0433\u043e\u0434|\u0433\u043e\u0434|\u0433\u043e\u0434\u0430|\u043b\u0435\u0442|\u0433\u043e\u0434\u0443',
                'numbers': '\u043e\u0434:\u0438\u043d|\u043d\u0443,\u0434\u0432:\u0430|\u0435,\u0442\u0440\u0438,\u0447\u0435\u0442\u044b\u0440\u0435,\u043f\u044f\u0442\u044c,\u0448\u0435\u0441\u0442\u044c,\u0441\u0435\u043c\u044c,\u0432\u043e\u0441\u0435\u043c\u044c,\u0434\u0435\u0432\u044f\u0442\u044c,\u0434\u0435\u0441\u044f\u0442\u044c',
                'tokens': '\u0432|\u043d\u0430,\u0433\u043e\u0434\u0430',
                'short': '{d} {month} {yyyy} \u0433\u043e\u0434\u0430',
                'long': '{d} {month} {yyyy} \u0433\u043e\u0434\u0430 {H}:{mm}',
                'full': '{Weekday} {d} {month} {yyyy} \u0433\u043e\u0434\u0430 {H}:{mm}:{ss}',
                'relative': function (num, unit, ms, format) {
                    var numberWithUnit, last = num.toString().slice(-1);
                    switch (true) {
                    case num >= 11 && num <= 15:
                        mult = 3;
                        break;
                    case last == 1:
                        mult = 1;
                        break;
                    case last >= 2 && last <= 4:
                        mult = 2;
                        break;
                    default:
                        mult = 3;
                    }
                    numberWithUnit = num + ' ' + this['units'][mult * 8 + unit];
                    switch (format) {
                    case 'duration':
                        return numberWithUnit;
                    case 'past':
                        return numberWithUnit + ' \u043d\u0430\u0437\u0430\u0434';
                    case 'future':
                        return '\u0447\u0435\u0440\u0435\u0437 ' + numberWithUnit;
                    }
                },
                'timeMarker': '\u0432',
                'ampm': ' \u0443\u0442\u0440\u0430, \u0432\u0435\u0447\u0435\u0440\u0430',
                'modifiers': [
                    {
                        'name': 'day',
                        'src': '\u043f\u043e\u0437\u0430\u0432\u0447\u0435\u0440\u0430',
                        'value': -2
                    },
                    {
                        'name': 'day',
                        'src': '\u0432\u0447\u0435\u0440\u0430',
                        'value': -1
                    },
                    {
                        'name': 'day',
                        'src': '\u0441\u0435\u0433\u043e\u0434\u043d\u044f',
                        'value': 0
                    },
                    {
                        'name': 'day',
                        'src': '\u0437\u0430\u0432\u0442\u0440\u0430',
                        'value': 1
                    },
                    {
                        'name': 'day',
                        'src': '\u043f\u043e\u0441\u043b\u0435\u0437\u0430\u0432\u0442\u0440\u0430',
                        'value': 2
                    },
                    {
                        'name': 'sign',
                        'src': '\u043d\u0430\u0437\u0430\u0434',
                        'value': -1
                    },
                    {
                        'name': 'sign',
                        'src': '\u0447\u0435\u0440\u0435\u0437',
                        'value': 1
                    },
                    {
                        'name': 'shift',
                        'src': '\u043f\u0440\u043e\u0448\u043b:\u044b\u0439|\u043e\u0439|\u043e\u043c',
                        'value': -1
                    },
                    {
                        'name': 'shift',
                        'src': '\u0441\u043b\u0435\u0434\u0443\u044e\u0449:\u0438\u0439|\u0435\u0439|\u0435\u043c',
                        'value': 1
                    }
                ],
                'dateParse': [
                    '{num} {unit} {sign}',
                    '{sign} {num} {unit}',
                    '{month} {year}',
                    '{0?} {shift} {unit=5-7}'
                ],
                'timeParse': [
                    '{date} {month} {year?} {1?}',
                    '{0?} {shift} {weekday}'
                ]
            });
            Date.addLocale('sv', {
                'plural': true,
                'months': 'januari,februari,mars,april,maj,juni,juli,augusti,september,oktober,november,december',
                'weekdays': 's\xf6ndag|sondag,m\xe5ndag:|en+mandag:|en,tisdag,onsdag,torsdag,fredag,l\xf6rdag|lordag',
                'units': 'millisekund:|er,sekund:|er,minut:|er,timm:e|ar,dag:|ar,veck:a|or|an,m\xe5nad:|er|en+manad:|er|en,\xe5r:||et+ar:||et',
                'numbers': 'en|ett,tv\xe5|tva,tre,fyra,fem,sex,sju,\xe5tta|atta,nio,tio',
                'tokens': 'den,f\xf6r|for',
                'articles': 'den',
                'short': 'den {d} {month} {yyyy}',
                'long': 'den {d} {month} {yyyy} {H}:{mm}',
                'full': '{Weekday} den {d} {month} {yyyy} {H}:{mm}:{ss}',
                'past': '{num} {unit} {sign}',
                'future': '{sign} {num} {unit}',
                'duration': '{num} {unit}',
                'ampm': 'am,pm',
                'modifiers': [
                    {
                        'name': 'day',
                        'src': 'f\xf6rrg\xe5r|i f\xf6rrg\xe5r|if\xf6rrg\xe5r|forrgar|i forrgar|iforrgar',
                        'value': -2
                    },
                    {
                        'name': 'day',
                        'src': 'g\xe5r|i g\xe5r|ig\xe5r|gar|i gar|igar',
                        'value': -1
                    },
                    {
                        'name': 'day',
                        'src': 'dag|i dag|idag',
                        'value': 0
                    },
                    {
                        'name': 'day',
                        'src': 'morgon|i morgon|imorgon',
                        'value': 1
                    },
                    {
                        'name': 'day',
                        'src': '\xf6ver morgon|\xf6vermorgon|i \xf6ver morgon|i \xf6vermorgon|i\xf6vermorgon|over morgon|overmorgon|i over morgon|i overmorgon|iovermorgon',
                        'value': 2
                    },
                    {
                        'name': 'sign',
                        'src': 'sedan|sen',
                        'value': -1
                    },
                    {
                        'name': 'sign',
                        'src': 'om',
                        'value': 1
                    },
                    {
                        'name': 'shift',
                        'src': 'i f\xf6rra|f\xf6rra|i forra|forra',
                        'value': -1
                    },
                    {
                        'name': 'shift',
                        'src': 'denna',
                        'value': 0
                    },
                    {
                        'name': 'shift',
                        'src': 'n\xe4sta|nasta',
                        'value': 1
                    }
                ],
                'dateParse': [
                    '{num} {unit} {sign}',
                    '{sign} {num} {unit}',
                    '{1?} {num} {unit} {sign}',
                    '{shift} {unit=5-7}'
                ],
                'timeParse': [
                    '{0?} {weekday?} {date?} {month} {year}',
                    '{date} {month}',
                    '{shift} {weekday}'
                ]
            });
            Date.addLocale('zh-CN', {
                'variant': true,
                'monthSuffix': '\u6708',
                'weekdays': '\u661f\u671f\u65e5|\u5468\u65e5,\u661f\u671f\u4e00|\u5468\u4e00,\u661f\u671f\u4e8c|\u5468\u4e8c,\u661f\u671f\u4e09|\u5468\u4e09,\u661f\u671f\u56db|\u5468\u56db,\u661f\u671f\u4e94|\u5468\u4e94,\u661f\u671f\u516d|\u5468\u516d',
                'units': '\u6beb\u79d2,\u79d2\u949f,\u5206\u949f,\u5c0f\u65f6,\u5929,\u4e2a\u661f\u671f|\u5468,\u4e2a\u6708,\u5e74',
                'tokens': '\u65e5|\u53f7',
                'short': '{yyyy}\u5e74{M}\u6708{d}\u65e5',
                'long': '{yyyy}\u5e74{M}\u6708{d}\u65e5 {tt}{h}:{mm}',
                'full': '{yyyy}\u5e74{M}\u6708{d}\u65e5 {weekday} {tt}{h}:{mm}:{ss}',
                'past': '{num}{unit}{sign}',
                'future': '{num}{unit}{sign}',
                'duration': '{num}{unit}',
                'timeSuffixes': '\u70b9|\u65f6,\u5206\u949f?,\u79d2',
                'ampm': '\u4e0a\u5348,\u4e0b\u5348',
                'modifiers': [
                    {
                        'name': 'day',
                        'src': '\u524d\u5929',
                        'value': -2
                    },
                    {
                        'name': 'day',
                        'src': '\u6628\u5929',
                        'value': -1
                    },
                    {
                        'name': 'day',
                        'src': '\u4eca\u5929',
                        'value': 0
                    },
                    {
                        'name': 'day',
                        'src': '\u660e\u5929',
                        'value': 1
                    },
                    {
                        'name': 'day',
                        'src': '\u540e\u5929',
                        'value': 2
                    },
                    {
                        'name': 'sign',
                        'src': '\u524d',
                        'value': -1
                    },
                    {
                        'name': 'sign',
                        'src': '\u540e',
                        'value': 1
                    },
                    {
                        'name': 'shift',
                        'src': '\u4e0a|\u53bb',
                        'value': -1
                    },
                    {
                        'name': 'shift',
                        'src': '\u8fd9',
                        'value': 0
                    },
                    {
                        'name': 'shift',
                        'src': '\u4e0b|\u660e',
                        'value': 1
                    }
                ],
                'dateParse': [
                    '{num}{unit}{sign}',
                    '{shift}{unit=5-7}'
                ],
                'timeParse': [
                    '{shift}{weekday}',
                    '{year}\u5e74{month?}\u6708?{date?}{0?}',
                    '{month}\u6708{date?}{0?}',
                    '{date}[\u65e5\u53f7]'
                ]
            });
            Date.addLocale('zh-TW', {
                'monthSuffix': '\u6708',
                'weekdays': '\u661f\u671f\u65e5|\u9031\u65e5,\u661f\u671f\u4e00|\u9031\u4e00,\u661f\u671f\u4e8c|\u9031\u4e8c,\u661f\u671f\u4e09|\u9031\u4e09,\u661f\u671f\u56db|\u9031\u56db,\u661f\u671f\u4e94|\u9031\u4e94,\u661f\u671f\u516d|\u9031\u516d',
                'units': '\u6beb\u79d2,\u79d2\u9418,\u5206\u9418,\u5c0f\u6642,\u5929,\u500b\u661f\u671f|\u9031,\u500b\u6708,\u5e74',
                'tokens': '\u65e5|\u865f',
                'short': '{yyyy}\u5e74{M}\u6708{d}\u65e5',
                'long': '{yyyy}\u5e74{M}\u6708{d}\u65e5 {tt}{h}:{mm}',
                'full': '{yyyy}\u5e74{M}\u6708{d}\u65e5 {Weekday} {tt}{h}:{mm}:{ss}',
                'past': '{num}{unit}{sign}',
                'future': '{num}{unit}{sign}',
                'duration': '{num}{unit}',
                'timeSuffixes': '\u9ede|\u6642,\u5206\u9418?,\u79d2',
                'ampm': '\u4e0a\u5348,\u4e0b\u5348',
                'modifiers': [
                    {
                        'name': 'day',
                        'src': '\u524d\u5929',
                        'value': -2
                    },
                    {
                        'name': 'day',
                        'src': '\u6628\u5929',
                        'value': -1
                    },
                    {
                        'name': 'day',
                        'src': '\u4eca\u5929',
                        'value': 0
                    },
                    {
                        'name': 'day',
                        'src': '\u660e\u5929',
                        'value': 1
                    },
                    {
                        'name': 'day',
                        'src': '\u5f8c\u5929',
                        'value': 2
                    },
                    {
                        'name': 'sign',
                        'src': '\u524d',
                        'value': -1
                    },
                    {
                        'name': 'sign',
                        'src': '\u5f8c',
                        'value': 1
                    },
                    {
                        'name': 'shift',
                        'src': '\u4e0a|\u53bb',
                        'value': -1
                    },
                    {
                        'name': 'shift',
                        'src': '\u9019',
                        'value': 0
                    },
                    {
                        'name': 'shift',
                        'src': '\u4e0b|\u660e',
                        'value': 1
                    }
                ],
                'dateParse': [
                    '{num}{unit}{sign}',
                    '{shift}{unit=5-7}'
                ],
                'timeParse': [
                    '{shift}{weekday}',
                    '{year}\u5e74{month?}\u6708?{date?}{0?}',
                    '{month}\u6708{date?}{0?}',
                    '{date}[\u65e5\u865f]'
                ]
            });
        }());
    });
    require('/src\\wowboardhelpers.ls');
}.call(this, this));