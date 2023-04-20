({
  // const imgPath = node.path.join(node.process.cwd(), `../NodeJS-Application/static/image/${fileName}`);
  access: 'public',
  method: async (file) => {
    try {
      const { data } = file;
      const [, base64Data] = data.split(';base64,');
      const buffer = node.buffer.from(base64Data, 'base64');
      const fileName = `${context.uuid}`;
      const imgPath = node.path.join(node.process.cwd(), `../../client/public/image/${fileName}`);
      const pathToSend = `../image/${fileName}`;
      const writer = node.fs.createWriteStream(imgPath);
      await writer.write(buffer);
      await writer.end();
      return { status: 'fulfilled', result: pathToSend };
    } catch (error) {
      console.log({ error });
      return { status: 'rejected', result: error };
    }
  },
});


// const zip = new npm.jszip();
// zip.file(fileName, buffer);
// const content = await zip.generateAsync({ type: 'nodebuffer' });
// await node.fsp.writeFile(imgPath + ".zip", content, { flag: 'w' });

//old version

// try {
  // const data = file.data.replace(/^data:image\/\w+;base64,/, '');
  // const buffer = node.buffer.from(data, 'base64');
  // const fileName = `${context.uuid}`;
  // const imgPath = node.path.join(node.process.cwd(), `../../client/public/image/${fileName}`);
  // const pathToSend = `../image/${fileName}`;
  // await node.fsp.writeFile(imgPath, buffer);
  // return { status: 'fulfilled', result: pathToSend };
// } catch (error) {
//   console.log({ error });
//   return { status: 'rejected', result: error };
// }