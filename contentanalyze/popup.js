document.addEventListener('DOMContentLoaded', () => {
  const textArea = document.getElementById('textArea');
  const processBtn = document.getElementById('processBtn');
  const fileInput = document.getElementById('fileInput');
  const resultDiv = document.getElementById('result');

  // 文件上传处理
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        textArea.value = e.target.result;
      };
      reader.readAsText(file);
    }
  });

  // 处理文本按钮点击
  processBtn.addEventListener('click', () => {
    const text = textArea.value;
    if (!text.trim()) return;

    // 查找重复单词
    const duplicates = findDuplicates(text);
    const highlightedText = highlightDuplicates(text, duplicates);
    
    resultDiv.innerHTML = highlightedText;
  });

  // 查找重复单词的函数
  function findDuplicates(text) {
    const words = text.toLowerCase().match(/\b[\w']+\b/g) || [];
    const wordCount = {};

    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    return Object.keys(wordCount).filter(word => wordCount[word] > 1);
  }

  // 高亮显示重复单词的函数
  function highlightDuplicates(text, duplicates) {
    return text.split(/\b/).map(chunk => {
      const normalized = chunk.toLowerCase().replace(/[^\w']/g, '');
      return duplicates.includes(normalized) ?
        `<span class="highlight">${chunk}</span>` : chunk;
    }).join('');
  }
});