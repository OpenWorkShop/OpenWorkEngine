namespace OpenWorkEngine.OpenController.Lib.Filesystem {
  /// <summary>
  ///   Mimics the "File" object type in Javascript.
  /// </summary>
  public interface IClientSelectedFile {
    public string Name { get; }

    public long LastModified { get; }

    public int Size { get; }

    public string Type { get; }
  }
}
