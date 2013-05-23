require! <[fs LiveScript nephrite stylus esprima glob md5 escodegen]>
{exec} = require 'child_process'
cjs = require 'commonjs-everywhere'

ls = -> ["#it/#file" for file in fs.readdirSync it]
blame = -> say ...; process.exit!

##########
# CONFIG #
##########
outfile = \wowboardhelpers.user.js
metadata = slurp \metadata.js

compile-styles = ->
  # XXX kind of relying on lexicographic ordering here
  source = []
  for dir in ls \src
    if fs.existsSync "#dir/styles/"
      for file in ls "#dir/styles/"
        source.push slurp file

  nib source * '\n' .render!

nib = -> stylus it .use require(\nib)!

ls-parse = (src, filename) ->
  try LiveScript.compile src, {+bare, filename}
  catch {message} => say "LiveScript (#filename): #message"

en-ast = (fn) -> (src, filename) ->
  try esprima.parse fn src.toString!, filename
  catch {message} => say "Esprima (#filename): #message"


cjs-options =
  export: null
  node: false
  handlers:
    '.styl': ->
      # trap it, triggered when last-changed is a .styl
      # XXX could maybe actually be used to notice css changed
    '.ne': en-ast (src, filename) ->
      try src = nephrite src, filename
      catch {message} => say "Nephrite (#filename): #message"
      ls-parse src, filename

    '.ls': en-ast (it, filename) ->
      ls-parse it, filename

    '.js': en-ast (it, filename) -> it

processed = {}
entry-point = "src/wowboardhelpers.ls"
last-changed = entry-point

traverseDeps = cjs~traverseDependenciesSync
bundle = cjs~bundle

var ast, css, css-change

task \build "build userscript" ->
  if css-change or not css
    console.time "CSS"
    css := compile-styles!trim!replace /\n/g '\\\n'
    console.timeEnd "CSS"

  unless css-change
    console.time "CJS"
    new-deps = traverseDeps last-changed, __dirname, cjs-options
    for file of new-deps => processed[file] = new-deps[file]

    ast := bundle processed, entry-point, __dirname, cjs-options
    console.timeEnd "CJS"

  console.time "gen"
  code = escodegen.generate ast
  console.timeEnd "gen"

  spit outfile, "// Generated by WBH:Slakefile\n#metadata\n
    #{code.replace '%css%' css}"
  say "compiled script to #outfile"

task \watch 'watch for changes and rebuild automatically' !->
  invoke \build

  require('gaze') <[metadata.js src/**/* lib/**/* Slakefile]> !->
    say "Watching files for changes."
    @on "all" !(ev, file) ->
      return unless fs.statSync file .isFile!
      last-changed := file

      file .= slice __dirname.length + 1 # leading (anti)slash
      if file is "Slakefile"
        say "Slakefile changed."
        process.exit!

      css-change := ~file.indexOf '.styl'

      say "Event #ev on #file. Rebuilding."

      invoke 'build'

task \linkdeps 'Link the fuck out of the deps' !->
  lib-deps =
    autolink: <[ajax]>
    "parse-time": <[lang]>
  for lib, deps of lib-deps
    for dep in deps
      exec "cd lib/#lib && npm link ../#dep" !(err, a, b) ->
        blame "#lib: #err" if err
  
task \link 'Link the fuck out of the npm modules' !->
  modules = <[ajax autolink dom fetch-siblings lang parse-time]>
  for module in modules
    exec "rm -rf node_modules/#module"
    exec "npm link lib/#module" !(err, stdout, stderr) ->
      blame "#module: #err" if err
  say "Linked #{modules * ', '}."