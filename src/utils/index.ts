import prettier from 'prettier/standalone'
function prettierJSON(JSONType: any) {
  return prettier.format(JSON.stringify(JSONType), {
    parser: 'json',
    plugins: [window.prettierPlugins.babel],
  })
}

export { prettierJSON }
