<?php 
class db
{
	public $conn;
	public function __construct($host = 'localhost',$user = 'root',$pwd = 'root')
	{
		$this->conn = @mysql_connect($host,$user,$pwd);
		mysql_select_db('wish');
	}

	public function sel_wish()
	{
		$sql = 'SELECT * FROM wish';
		$result = mysql_query($sql,$this->conn);
		return mysql_fetch_array($result);
	}
	
	public function sel_msg()
	{
		$sql = 'SELECT * FROM msg';
		$result = mysql_query($sql,$this->conn);
		return mysql_fetch_array($result);
	}
	
	public function insert_wish($data)
	{
		$sql='insert into wish (insert_row_time,update_row_time,love_count,content,name,accect_name,status,is_past,msg_id,sex,skey,end_time) values("'.$res['insert_row_time'].'","'.$res['update_row_time'].'","'.$res['sex'].'","'.$res['email'].'","'.$res['photo'].'","'.$res['postcode'].'","'.$res['address'].'","'.$res['content'].'","'.$time.'","0")';
		mysql_query($sql);
	}
	public function insert_msg($data)
	{
		$sql='insert into wish (wish_id,content,note_name,insert_row_time,wish_content) values("'.$res['wish_id'].'","'.$res['content'].'","'.$res['content'].'","'.$res['note_name'].'","'.$res['insert_row_time'].'","'.$res['wish_content'].'")';
		mysql_query($sql);
	}
	
	public function desc_wish()
	{
		$sql = 'SELECT * FROM wish WHERE skey = '.a.' GROUP BY  ';
	}
}
?>