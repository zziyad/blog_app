declare namespace api.post {
  function getPosts(parameters: {
    category;
    string;
  }): Promise<{ status: string; result: object }>;
  function getPost(parameters: {
    postid: string;
  }): Promise<{ status: string; result: object }>;
}
