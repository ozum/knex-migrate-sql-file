https://github.com/node-schedule/node-schedule

Background Jobs
https://levelup.gitconnected.com/execute-long-running-jobs-in-the-background-node-js-e74e12163fef
https://bullmq.io/
https://github.com/timgit/pg-boss#readme

Her bir "source" ve her bir "registry" bağımsız modüller olarak düşünüldü. Gerçek bir uygulamada heri biri bağımsız birer NPM paketi olabilir. O nedenle type'lar ve varsa yardımcı fonksiyonlar kendine özgü olarak mümkün olduğunca lokal tutuldu

- "ExperimentalWarning: VM Modules is an experimental feature..."
  `--experimental-vm-modules` flag is used to test ES Modules with Jest. (https://jestjs.io/docs/ecmascript-modules)

- Abstract class'ların `config` ve `option` benzeri yapılandırma tipleri export edilirken, concrete class'lardakileri export etmemeyi tercih ettim. Gerekirse edilmesi düşünülebilir.

- Source'larda iki abstract class var çünkü çok çeşitli repository provider'lar ve source control sistemleri var, ileride genişleme olasılığı fazla. Örneğin `FileSystem` kullanılabilir.
- Registry'ler genelde benzer bir yapı kullandığı için tek bir abstract class yeterli görünüyor. İleride ihtiyaç olması halinde refactor yapılabilir.

## About Database

- ID alanları için genelde UUID veya benzeri içerdiği bilgi tahmin edilemeyen veri tipleri kullanmayı tercih ederim. Eğer kullanıcıya gösterilmeyen ve performans gerektiren bir alansa ve olası kayıt adedi izin veriyorsa integer türevlerini tercih ederim.
- https://github.com/theory/pg-semver extension'ı ilerideki uygulamalar için kullanışlı olurdu, ancak sunucu ortamı hakkında bilgim olmadığı için bu extension yüklenemeyebilir diye kullanmadım.
- Subscriber'lar için ayrı bir tablo oluşturmadım. Şu anki basit yapıda ihtiyaç gözükmüyor. Ancak farklı ihtiyaçlar olması durumunda bu tasarım değişebilir. (Örneğin bir kullanıcının abone olabileceği maksimum abonelik sayısını sınırlama vb. gibi)
