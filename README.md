整理一些看過比較不錯的 Microservice 相關開源專案和資源 <br>
用於學習 DDD/CQRS/ES/SAGA 搭配 Kafka/RabbitMQ 進行微服務實作和專案擴展 <br>

---

下次討論內容大綱

- [ ] 1. 簡介 Microservice 及 DDD/CQRS/ES 並討論常見誤區 (嘗試微服務初期, 很容易不小心直接把 MVC 架構拆出多個專案, 這會讓架構變得更糟糕)
![image](https://user-images.githubusercontent.com/90891243/230529010-d24a02a5-0464-4707-bbfd-d1f145705587.png)

- [ ] 2. 簡介 SAGA Pattern 之中的 Compensation Transaction 與 Eventually Consistent
```
https://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf
https://ithelp.ithome.com.tw/articles/10236124
```
![image](https://user-images.githubusercontent.com/90891243/230528323-a3178cc0-9b82-4dad-8ef2-f1ca597ad3b2.png)
![image](https://user-images.githubusercontent.com/90891243/230528652-5194c9e6-9e7f-49fb-89d6-01d9aefa717d.png)
![image](https://user-images.githubusercontent.com/90891243/230528822-cac20edf-b094-4601-bdda-eae74adbc97d.png)
![image](https://user-images.githubusercontent.com/90891243/230528833-55b57b88-594e-40b9-a643-15eca6c19da9.png)
![image](https://user-images.githubusercontent.com/90891243/230574809-ae51ea18-09de-42ad-aba8-5509c52e9ffc.png)
![image](https://user-images.githubusercontent.com/90891243/230574852-3ca2ecc8-e259-45eb-b133-3f2915bbfe0d.png)


- [ ] 3. 根據架構圖與實際專案 demo 進行討論
![image](https://user-images.githubusercontent.com/90891243/230529647-c3bc2e68-1304-4791-b6f5-501f92accd95.png)
![image](https://user-images.githubusercontent.com/90891243/230576496-7930b624-20f4-48d9-a761-fad754df6971.png)

- [ ] 4. demo 結束後可以再討論要嘗試加上去的功能或是如何調整專案架構
