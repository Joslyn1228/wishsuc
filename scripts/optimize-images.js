const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 检查是否安装了cwebp
function checkCwebp() {
  try {
    execSync('cwebp -version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.error('Error: cwebp is not installed. Please install it from https://developers.google.com/speed/webp/download');
    return false;
  }
}

// 优化图片目录
function optimizeImages(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      // 递归处理子目录
      optimizeImages(filePath);
    } else if (stats.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        const outputPath = filePath.replace(ext, '.webp');
        
        if (!fs.existsSync(outputPath)) {
          console.log(`Optimizing ${filePath}...`);
          try {
            // 使用cwebp进行压缩，质量75（平衡质量和大小）
            execSync(`cwebp -q 75 "${filePath}" -o "${outputPath}"`, {
              stdio: 'inherit'
            });
            console.log(`✓ Optimized ${file} to WebP`);
          } catch (error) {
            console.error(`✗ Failed to optimize ${file}:`, error.message);
          }
        } else {
          console.log(`✓ ${file} already optimized`);
        }
      }
    }
  });
}

// 主函数
function main() {
  if (!checkCwebp()) {
    return;
  }
  
  const imageDir = path.join(__dirname, '..', 'public', 'images');
  console.log(`Starting image optimization in ${imageDir}...`);
  
  try {
    optimizeImages(imageDir);
    console.log('\n✓ All images optimized successfully!');
  } catch (error) {
    console.error('✗ Image optimization failed:', error.message);
    process.exit(1);
  }
}

main();