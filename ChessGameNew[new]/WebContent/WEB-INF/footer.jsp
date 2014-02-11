
<hr>

<footer style="color: white">

	<p>Developed by Dianxia Yang & Shuangjie Cai</p>

</footer>

</div>
<!-- 	/container

	Le javascript

    ==================================================

	Placed at the end of the document so the pages load faster -->
	

<script>
	/* 		$(function() {
	 $('#test').popover('show');
	 }); */
	$('a[rel=popover]').popover().click(function(e) {
		e.preventDefault();
	});
</script>

</body>
</html>