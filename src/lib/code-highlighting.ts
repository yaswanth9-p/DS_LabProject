import Prism from 'prismjs';
Prism.languages['cpp'] = Prism.languages.extend('clike', {
 keyword: /\b(?:alignas|auto|bool|break|case|char|class|const|continue|default|delete|do|double|else|enum|explicit|extern|false|float|for|if|include|inline|int|long|namespace|new|nullptr|private|protected|public|return|short|signed|sizeof|static|struct|switch|template|this|true|typedef|typename|union|unsigned|using|virtual|void|volatile|while)\b/,
});
Prism.languages['python'] = {
 comment: { pattern: /#.*/, greedy: true },
 string: { pattern: /(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\r\n])*"|'(?:\\.|[^'\\\r\n])*')/, greedy: true },
 keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/,
 boolean: /\b(?:True|False|None)\b/,
 function: /\b[a-zA-Z_]\w*(?=\s*\()/,
 number: /\b\d+(?:\.\d+)?\b/,
 operator: /[-+*/%=<>!]+/,
 punctuation: /[{}[\];(),.:]/,
};
export default Prism;
