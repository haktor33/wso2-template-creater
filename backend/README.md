# Kod Üretme Projesi

Bu proje, mevcut kod parçalarını ve açıklamalarını kullanarak yeni kod parçaları üreten ve dinamik parametreler kabul eden bir API sağlar.

## Gereksinimler

- Flask
- pandas
- scikit-learn
- nltk

## Kurulum

1. Gerekli kütüphaneleri kurun:
    ```bash
    pip install -r requirements.txt
    ```

2. Flask uygulamasını başlatın:
    ```bash
    python app.py
    ```

## Kullanım

API'yi kullanmak için aşağıdaki `curl` komutunu veya bir API istemcisini kullanabilirsiniz:

```bash
curl -X POST http://127.0.0.1:5000/predict -H "Content-Type: application/json" -d '{"description": "Veri çerçevesini csv dosyasına kaydetme", "params": {"output": "my_output.csv"}}'


## edit csv file 
https://edit-csv.net/