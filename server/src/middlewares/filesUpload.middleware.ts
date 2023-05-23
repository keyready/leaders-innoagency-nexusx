import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

export const imageUploadOptions: MulterOptions = {
    storage: diskStorage({
    destination: './static', // Путь к папке, где будут сохраняться загруженные файлы
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, file.fieldname + '-' + uniqueSuffix); // Генерируем уникальное имя файла
    },
}),
};
