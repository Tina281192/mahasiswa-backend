
CREATE TABLE IF NOT EXISTS mahasiswa (
  nim VARCHAR(20) PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  alamat VARCHAR(255),
  tgl_lahir DATE,
  jurusan VARCHAR(100)
);

INSERT IGNORE INTO mahasiswa VALUES
('2021001', 'Andi Pratama', 'Manokwari', '2003-05-14', 'Teknik Informatika'),
('2021002', 'Siti Rahma', 'Sorong', '2002-11-02', 'Sistem Informasi');


