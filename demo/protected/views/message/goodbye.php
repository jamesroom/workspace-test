<?php
$this->breadcrumbs=array(
	'Message'=>array('message/index'),
	'goodbye',
);?>
<h1><?php echo $this->id . '/' . $this->action->id; ?></h1>

<p>You may change the content of this page by modifying the file <tt><?php echo __FILE__; ?></tt>.</p>
<p>hello world</p>
<?php echo "this is good bye page";?>

<h1> <?php echo CHtml::link("Goodbye",array('message/helloworld'))  ;?></h1>
